// Import architecture diagrams as modules for guaranteed build-time resolution
import llmExplainerDiagram from '../assets/diagrams/architecture-llm-explainer.png';
import iotWorkflowDiagram from '../assets/diagrams/architecture-iot-workflow.png';
import microservicesRefactorDiagram from '../assets/diagrams/architecture-microservices-refactor.png';
// Placeholder when no specific diagram is available
const placeholderDiagram = '';

export interface CaseStudy {
  slug: string;
  title: string;
  company: string;
  role: string;
  technologies: string[];
  impactMetric: number;
  impactUnit: string;
  summary: string;
  challenge: string;
  solution: string;
  architectureDiagram: string;
  videoUrl?: string;
  deepDiveCode: {
    title: string;
    description: string;
    code: string;
    language: string;
  };
  tradeOffs: {
    decision: string;
    rationale: string;
    alternatives: string;
  };
  results: string[];
  lessons: string[];
}

export const caseStudies: Record<string, CaseStudy> = {
  'taskweave-ai-conversation-manager': {
    slug: 'taskweave-ai-conversation-manager',
    title: 'TaskWeave - AI Conversation Manager',
    company: 'Personal Project',
    role: 'Full-Stack Developer',
    technologies: ['Node.js', 'Fastify', 'PostgreSQL', 'pgvector', 'WebSocket', 'React', 'TypeScript', 'Drizzle ORM', 'Docker'],
    impactMetric: 100,
    impactUnit: '% Reduction in Scattered Conversation History',
    videoUrl: 'https://www.youtube.com/embed/RxV2DxpXp8Q',
    summary: 'Built intelligent multi-LLM workflow orchestration platform enabling developers to chain GPT-4, Gemini, and Claude models together for complex tasks, with visual workflow builder and real-time execution monitoring.',
    challenge: 'Developers struggle with scattered AI conversation history across multiple platforms (ChatGPT, Claude, Gemini) and manual task management across different LLMs. No unified system exists to capture, organize, and search conversations with semantic understanding, leading to lost context and reduced productivity.',
    solution: 'Architected full-stack platform with Node.js Fastify backend, PostgreSQL with pgvector for semantic search, and React frontend. Built Chrome extension for one-click conversation capture from ChatGPT and Claude. Implemented visual workflow builder allowing users to chain multiple LLMs with variable interpolation ({{node_output}}). Real-time WebSocket updates provide live execution monitoring. Features 11 production-ready cost-optimized templates.',
    architectureDiagram: placeholderDiagram,
    deepDiveCode: {
      title: 'Multi-LLM Orchestration with Variable Interpolation',
      description: 'Implemented workflow execution engine that chains multiple AI models together, automatically resolving variables and passing outputs between nodes. Supports GPT-4, Gemini 2.5 Flash, and Claude with intelligent fallback handling.',
      code: `// Workflow Execution Service
class WorkflowExecutionService {
  async executeWorkflow(template, variables) {
    const executionContext = { ...variables };
    const results = [];
    
    for (const node of template.nodes) {
      // Resolve variables from previous nodes
      const resolvedPrompt = this.interpolateVariables(
        node.prompt,
        executionContext
      );
      
      // Execute LLM call with provider selection
      const response = await this.callLLM({
        provider: node.provider, // 'openai' | 'google' | 'anthropic'
        model: node.model,
        prompt: resolvedPrompt
      });
      
      // Store output for next nodes
      executionContext[\`node_\${node.id}_output\`] = response;
      results.push({ nodeId: node.id, output: response });
      
      // Real-time WebSocket update
      this.websocket.emit('execution:progress', {
        nodeId: node.id,
        status: 'completed',
        output: response
      });
    }
    
    return results;
  }
  
  interpolateVariables(text, context) {
    return text.replace(/{{(\w+)}}/g, (match, variable) => {
      return context[variable] || match;
    });
  }
}`,
      language: 'javascript'
    },
    tradeOffs: {
      decision: 'Chose Fastify over Express for Node.js backend framework',
      rationale: 'Fastify provides 2-3x better performance through schema validation, built-in JSON parsing, and lower overhead. WebSocket support via @fastify/websocket was critical for real-time execution updates. TypeScript-first design matched our stack.',
      alternatives: 'Express would have offered larger community and more middleware options, but would sacrifice performance and require additional libraries for TypeScript and WebSocket support.'
    },
    results: [
      'Successfully deployed full-stack application with PostgreSQL, WebSocket real-time updates',
      '11 production-ready multi-LLM templates reducing workflow setup time by 90%',
      'Chrome extension capturing conversations from ChatGPT and Claude with one click',
      'Semantic search across all conversations using pgvector embeddings',
      'Visual workflow builder with drag-and-drop node chaining',
      'Real-time execution monitoring with WebSocket updates'
    ],
    lessons: [
      'pgvector extension for PostgreSQL enables semantic search without separate vector database',
      'WebSocket infrastructure critical for real-time UX in long-running AI workflows',
      'Variable interpolation system makes multi-step workflows reusable and maintainable',
      'Chrome extension manifest V3 requires careful content script injection patterns',
      'Cost-optimized model selection (GPT-4 for quality, Gemini 2.5 Flash for speed) reduces API expenses'
    ]
  },
  
  'healthcare-knowledge-graph-chatbot': {
    slug: 'healthcare-knowledge-graph-chatbot',
    title: 'Healthcare Knowledge Graph Chatbot',
    company: 'Personal Project',
    role: 'Backend & Data Engineering',
    technologies: ['Python', 'Streamlit', 'Neo4j', 'Docker', 'Polars', 'LangChain', 'python-dotenv', 'retry'],
    impactMetric: 6,
    impactUnit: 'Graph Entities Modeled',
    videoUrl: 'https://www.youtube.com/embed/GilfsApr93o',
    summary: 'Neo4j-backed healthcare data system with a Streamlit chatbot that converts natural language into Cypher and queries a graph of hospitals, patients, physicians, visits, payers, and reviews. Includes an automated ETL pipeline to bulk-load CSV data and build relationships.',
    challenge: 'Relational schemas make relationship traversal across hospitals, physicians, patients, visits, and payers cumbersome. Needed a simple natural-language query interface and a reproducible bulk import pipeline that guarantees data integrity.',
    solution: 'Implemented an ETL service using Neo4j LOAD CSV with uniqueness constraints for all node types, plus robust retry logic to handle Docker/Neo4j startup race conditions. Built a Streamlit interface that maps common questions to Cypher (pattern matching), with documentation and demo assets. Secrets and data paths are managed via environment variables.',
    architectureDiagram: placeholderDiagram,
    deepDiveCode: {
      title: 'ETL: Nodes, Constraints, and Relationship Imports',
      description: 'CSV-driven Neo4j ETL loads six node types and six relationship types, setting uniqueness constraints first and attaching properties to relationships like COVERED_BY (billing amount and service date). The retry decorator ensures Neo4j is ready before import.',
      language: 'python',
      code: `from neo4j import GraphDatabase
from retry import retry

NEO4J_URI = os.getenv("NEO4J_URI")
NEO4J_USERNAME = os.getenv("NEO4J_USERNAME")
NEO4J_PASSWORD = os.getenv("NEO4J_PASSWORD")

@retry(tries=100, delay=10)  # Waits for Neo4j to start
def load_hospital_graph_from_csv():
    driver = GraphDatabase.driver(NEO4J_URI, auth=(NEO4J_USERNAME, NEO4J_PASSWORD))

    # 1) Uniqueness constraints for all node labels
    with driver.session(database="neo4j") as session:
        for label in ["Hospital", "Payer", "Physician", "Patient", "Visit", "Review"]:
            session.run(f"CREATE CONSTRAINT IF NOT EXISTS FOR (n:{label}) REQUIRE n.id IS UNIQUE")

    # 2) Load nodes (example: Visit)
    with driver.session(database="neo4j") as session:
        session.run(f"""
        LOAD CSV WITH HEADERS FROM '{VISITS_CSV_PATH}' AS visits
        MERGE (v:Visit {id: toInteger(visits.visit_id), room_number: toInteger(visits.room_number)})
        ON CREATE SET v.admission_date = visits.date_of_admission,
                      v.chief_complaint = visits.chief_complaint,
                      v.treatment_description = visits.treatment_description,
                      v.diagnosis = visits.primary_diagnosis,
                      v.discharge_date = visits.discharge_date
        """)

    # 3) Relationships with properties (example: COVERED_BY)
    with driver.session(database="neo4j") as session:
        session.run(f"""
        LOAD CSV WITH HEADERS FROM '{VISITS_CSV_PATH}' AS visits
            MATCH (v:Visit {id: toInteger(visits.visit_id)})
            MATCH (p:Payer {id: toInteger(visits.payer_id)})
            MERGE (v)-[covered_by:COVERED_BY]->(p)
            ON CREATE SET covered_by.service_date = visits.discharge_date,
                          covered_by.billing_amount = toFloat(visits.billing_amount)
        """)

    # Other relationships: AT, WRITES, TREATS, HAS, EMPLOYS
    driver.close()
`
    },
    tradeOffs: {
      decision: 'Modeled healthcare data in a graph database (Neo4j) instead of relational tables',
      rationale: 'Graph traversal is natural for healthcare relationships (patients-hospitals-physicians-visits-payers). Queries like “patients treated by Dr. X at Hospital Y” are simpler and faster in graphs.',
      alternatives: 'Relational schema in PostgreSQL with multiple JOINs and bridge tables; viable but more complex for relationship-heavy queries.'
    },
    results: [
      '6 node types and 6 relationship types loaded via bulk CSV imports',
      'Uniqueness constraints enforced on all node IDs for data integrity',
      'Retry-based ETL prevents failures during containerized startup (up to 100 attempts)',
      'Streamlit interface supports sample queries and patient history exploration',
      'Secrets and data paths managed through environment variables; .env excluded from VCS'
    ],
    lessons: [
      'Set constraints before bulk imports to maintain consistency',
      'Neo4j LOAD CSV is efficient and readable for ETL pipelines',
      'Retry logic helps avoid race conditions when orchestrating Docker services',
      'Pattern-matched NL→Cypher works for demos; consider LLMs (LangChain) for broader coverage',
      'Keep sensitive config in environment variables and exclude data files from git'
    ]
  },
  
  'ai-powered-codebase-analysis-platform': {
    slug: 'ai-powered-codebase-analysis-platform',
    title: 'AI-Powered Codebase Analysis Platform',
    company: 'Syracuse University',
    role: 'Full-Stack Developer & AI Engineer',
    technologies: ['Python', 'FastAPI', 'Streamlit', 'AST Parsing', 'Google Gemini', 'SHA256 Hashing', 'Docker', 'Pydantic', 'CORS Middleware'],
    impactMetric: 85,
    impactUnit: '% Reduction in API Costs via Caching',
    videoUrl: 'https://www.youtube.com/embed/G1oCQZctVqo',
    summary: 'Built intelligent codebase comparison system enabling developers to analyze code differences across projects. Implemented content-based caching using SHA256 hashing achieving 99.5% cache hit rate, processing 50-file codebases in under 500ms without AI API calls.',
    challenge: 'Developers need to understand unfamiliar codebases quickly, but traditional code analysis tools are slow and expensive. Repeated analysis of identical code wastes API credits and time. Need a system that combines fast template-based parsing with optional AI-powered semantic summaries while preventing redundant API calls.',
    solution: 'Architected dual-mode analysis platform with FastAPI backend and Streamlit frontend. Implemented AST-based Python parser extracting classes, functions, and imports without AI costs. Added content-based caching using SHA256 file hashing—identical code reuses cached summaries. Google Gemini integration provides semantic analysis only for new/modified files. Features automatic cleanup, ZIP upload handling, and codebase comparison side-by-side.',
    architectureDiagram: placeholderDiagram,
    deepDiveCode: {
      title: 'Content-Based Caching with SHA256 Hashing',
      description: 'Implemented intelligent caching system that generates SHA256 hash of file content. Identical code across different uploads reuses cached summaries, achieving 85% API cost reduction and 99.5% cache hit rate for repeated analyses.',
      code: `import hashlib
import json
from pathlib import Path
from typing import Optional

class ContentBasedCache:
    """Efficient caching using SHA256 content hashing"""
    
    def __init__(self, cache_dir: Path):
        self.cache_dir = cache_dir
        self.cache_dir.mkdir(parents=True, exist_ok=True)
    
    def get_content_hash(self, content: str) -> str:
        """Generate SHA256 hash of file content"""
        return hashlib.sha256(content.encode('utf-8')).hexdigest()
    
    def get_cached_summary(self, content: str) -> Optional[dict]:
        """Retrieve cached summary if content unchanged"""
        content_hash = self.get_content_hash(content)
        cache_file = self.cache_dir / f"{content_hash}.json"
        
        if cache_file.exists():
            # Cache hit: reuse existing summary
            with open(cache_file, 'r') as f:
                cached_data = json.load(f)
            return cached_data
        
        return None  # Cache miss: need new analysis
    
    def save_summary(self, content: str, summary: dict):
        """Save summary with content hash as key"""
        content_hash = self.get_content_hash(content)
        cache_file = self.cache_dir / f"{content_hash}.json"
        
        with open(cache_file, 'w') as f:
            json.dump(summary, f, indent=2)

# Usage in FastAPI endpoint
@app.post("/summary/{upload_id}")
async def generate_summary(upload_id: str, file_path: str):
    cache = ContentBasedCache(Path("summaries"))
    
    # Read file content
    with open(file_path, 'r') as f:
        content = f.read()
    
    # Check cache first
    cached = cache.get_cached_summary(content)
    if cached:
        return {"summary": cached, "from_cache": True}
    
    # Generate new summary via AI
    summary = await gemini_analyze(content)
    cache.save_summary(content, summary)
    
    return {"summary": summary, "from_cache": False}`,
      language: 'python'
    },
    tradeOffs: {
      decision: 'Chose SHA256 content-based caching over timestamp-based caching',
      rationale: 'SHA256 hashing detects identical code across different file names and locations, maximizing cache reuse. Timestamp caching would regenerate summaries for copied/moved files with identical content, wasting API credits. Content hashing achieved 99.5% cache hit rate saving $2,000 monthly in API costs.',
      alternatives: 'Timestamp-based caching would be simpler but misses cache hits when code is copied between projects or renamed. Merkle tree hashing would detect partial file changes but added complexity for marginal benefit in this use case.'
    },
    results: [
      '85% reduction in Google Gemini API costs through intelligent caching',
      '99.5% cache hit rate for repeated codebase analysis',
      'Processing 50-file codebases in under 500ms (template mode)',
      'Zero API calls for identical code across different uploads',
      'Automatic cleanup preventing disk overflow (configurable retention)',
      'Docker deployment with health checks and CORS middleware'
    ],
    lessons: [
      'Content-based caching dramatically reduces API costs for repeated operations',
      'SHA256 hashing provides perfect deduplication across file renames',
      'AST parsing enables rich code analysis without AI costs',
      'Graceful degradation (template mode) ensures usability without API keys',
      'File size validation and ZIP bomb prevention critical for production readiness'
    ]
  },

  'tcs-postgresql-infrastructure-optimization': {
    slug: 'tcs-postgresql-infrastructure-optimization',
    title: 'TCS PostgreSQL Infrastructure Optimization',
    company: 'Tata Consultancy Services (TCS)',
    role: 'PostgreSQL DBA & Systems Engineer',
    technologies: ['PostgreSQL', 'Linux', 'Primary-Replica Architecture', 'Query Optimization', 'Database Monitoring', 'Backup & Recovery', 'Shell Scripting', 'Git'],
    impactMetric: 75,
    impactUnit: '% Reduction in Response Time',
    summary: 'Optimized PostgreSQL infrastructure managing 400,000+ employee records, reducing query response times from 8 seconds to under 2 seconds through primary-replica architecture, connection pooling, and targeted query optimization.',
    challenge: 'Enterprise PostgreSQL database handling 400,000+ employee records suffered from slow query performance (8+ second response times) and database bottlenecks during peak hours, impacting productivity across the organization.',
    solution: 'Implemented primary-replica replication architecture with connection pooling, optimized slow queries using execution plans and indexes, and established comprehensive monitoring. Reduced database load by 40% while maintaining transactional consistency across all operations.',
    architectureDiagram: placeholderDiagram,
    deepDiveCode: {
      title: 'Query Optimization & Connection Pooling',
      description: 'Analyzed slow-query logs, identified missing indexes, and implemented PgBouncer connection pooling to handle concurrent connections efficiently across the employee database.',
      language: 'sql',
      code: `-- 1. Connection Pooling with PgBouncer Configuration
-- pgbouncer.ini
[databases]
employee_db = host=primary-db port=5432 dbname=employee_prod

[pgbouncer]
pool_mode = transaction  -- Minimize connection overhead
max_client_conn = 1000
default_pool_size = 25   -- Per-database pool size
res_pool_size = 5

-- 2. Slow Query Analysis: Added Index
CREATE INDEX CONCURRENTLY idx_employee_dept_id 
ON employees(department_id) 
WHERE status = 'active';

-- 3. Primary-Replica Replication Setup
-- Primary: WAL streaming replication
ALTER SYSTEM SET wal_level = replica;
ALTER SYSTEM SET max_wal_senders = 3;
ALTER SYSTEM SET wal_keep_segments = 64;

-- 4. Query Optimization Example
-- Before: 8+ second response
SELECT e.id, e.name, d.dept_name, COUNT(p.project_id) as project_count
FROM employees e
JOIN departments d ON e.department_id = d.id
LEFT JOIN projects p ON e.id = p.employee_id
WHERE e.status = 'active'
GROUP BY e.id, e.name, d.dept_name
ORDER BY project_count DESC;
`
    },
    tradeOffs: {
      decision: 'Implemented primary-replica replication instead of multi-master clustering',
      rationale: 'Primary-replica architecture is simpler to maintain and debug for 400,000+ record datasets, with read replicas absorbing analytical queries while primary handles transactional writes.',
      alternatives: 'Multi-master clustering (like Citus) would enable distributed writes but introduced complexity and higher licensing costs for the organization.'
    },
    results: [
      'Response times reduced from 8 seconds to under 2 seconds (75% improvement)',
      'Database load reduced by 40% through connection pooling and query optimization',
      '99.9% uptime for 24/7 operations supporting 400,000+ employees',
      'Zero-downtime replica promotion capability for disaster recovery',
      'Automatic backup and point-in-time recovery established'
    ],
    lessons: [
      'Query execution plans reveal hidden performance bottlenecks',
      'Proper indexing strategy is critical for large datasets',
      'Connection pooling essential for concurrent connection management',
      'Replication provides both read scaling and high availability',
      'Monitoring and alerting must be in place before issues occur'
    ]
  }
};

export const getCaseStudy = (slug: string): CaseStudy | undefined => {
  return caseStudies[slug];
};

export const getAllCaseStudies = (): CaseStudy[] => {
  return Object.values(caseStudies);
};