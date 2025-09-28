// Import architecture diagrams as modules for guaranteed build-time resolution
import llmExplainerDiagram from '../assets/diagrams/architecture-llm-explainer.svg';
import iotWorkflowDiagram from '../assets/diagrams/architecture-iot-workflow.svg';
import microservicesRefactorDiagram from '../assets/diagrams/architecture-microservices-refactor.svg';

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
  'llm-powered-codebase-explainer': {
    slug: 'llm-powered-codebase-explainer',
    title: 'LLM-Powered Codebase Explainer',
    company: 'Syracuse University',
    role: 'Software Developer Intern',
    technologies: ['FastAPI', 'Streamlit', 'LlamaIndex', 'OpenAI', 'Gemini', 'PostgreSQL', 'AWS'],
    impactMetric: 35,
    impactUnit: '% Reduction in Developer Onboarding Time',
    summary: 'Designed and implemented a semantic search system that ingests repository code, generates embeddings, and provides intelligent code explanations using RAG architecture.',
    challenge: 'Developer onboarding for large university codebases was slow and manual, requiring senior engineers to spend valuable time answering repetitive, context-specific questions about system architecture and implementation details.',
    solution: 'Built a service that automatically ingests and parses repository code, extracts metadata, and generates embeddings for semantic search. A FastAPI service routes user queries to the appropriate LLM (OpenAI/Gemini) using LlamaIndex for Retrieval-Augmented Generation (RAG).',
    architectureDiagram: llmExplainerDiagram,
    deepDiveCode: {
      title: 'RAG Implementation with Caching Optimization',
      description: 'Implemented a robust caching and metadata persistence layer using PostgreSQL. This optimization cut redundant token/API usage by 25-30% and lowered inference costs.',
      code: `from llama_index import VectorStoreIndex, ServiceContext
from llama_index.vector_stores import PGVectorStore
import openai

class CodebaseExplainer:
    def __init__(self, db_connection):
        self.vector_store = PGVectorStore(connection=db_connection)
        self.service_context = ServiceContext.from_defaults(
            llm=openai.ChatOpenAI(model="gpt-4"),
            embed_model="text-embedding-ada-002"
        )
        
    def query_with_cache(self, query: str, repo_id: str):
        # Check cache first to reduce API costs
        cached_result = self.check_cache(query, repo_id)
        if cached_result:
            return cached_result
            
        # Build query engine with RAG
        query_engine = self.vector_store.as_query_engine(
            service_context=self.service_context,
            similarity_top_k=5
        )
        
        response = query_engine.query(f"Repository: {repo_id}\\n{query}")
        self.cache_result(query, repo_id, response)
        return response`,
      language: 'python'
    },
    tradeOffs: {
      decision: 'Chose FastAPI over Spring Boot for the backend service',
      rationale: 'To leverage Python\'s stronger ecosystem for vector databases and LLM orchestration libraries (like LlamaIndex), prioritizing rapid prototyping and library compatibility over Java\'s mature backend performance.',
      alternatives: 'Spring Boot would have provided better enterprise-grade performance and scalability, but would have required custom implementations for LLM integration and vector operations.'
    },
    results: [
      '30-40% reduction in developer onboarding time',
      '25-30% reduction in redundant API token usage through intelligent caching',
      'Processed 50+ repositories with 99.2% query accuracy',
      'Reduced senior engineer mentoring hours by 60%'
    ],
    lessons: [
      'Caching strategies are critical for cost-effective LLM applications',
      'Vector embeddings quality directly impacts retrieval accuracy',
      'Python ecosystem advantages outweigh performance trade-offs for AI-first applications'
    ]
  },
  
  'scalable-iot-device-workflow': {
    slug: 'scalable-iot-device-workflow',
    title: 'Scalable IoT Device Workflow',
    company: 'Meltek Inc.',
    role: 'Backend Engineer',
    technologies: ['Java', 'Spring Boot', 'Azure Logic Apps', 'Microservices', 'Docker', 'Jenkins'],
    impactMetric: 45,
    impactUnit: '% Reduction in Operational Costs',
    summary: 'Built enterprise-grade microservices architecture for IoT device management with SOC 2 compliance, implementing automated workflows and real-time monitoring.',
    challenge: 'Legacy monolithic system couldn\'t scale to handle 10,000+ IoT devices, causing bottlenecks in data processing and compliance reporting.',
    solution: 'Designed distributed microservices with event-driven architecture, implementing automated workflows for device provisioning, monitoring, and compliance reporting.',
    architectureDiagram: iotWorkflowDiagram,
    deepDiveCode: {
      title: 'Event-Driven Microservices Architecture',
      description: 'Implemented asynchronous event processing with Azure Service Bus for scalable IoT device management.',
      code: `@Service
@Component
public class DeviceWorkflowService {
    
    @Autowired
    private DeviceRepository deviceRepository;
    
    @EventListener
    @Async("deviceTaskExecutor")
    public void handleDeviceRegistration(DeviceRegisteredEvent event) {
        try {
            Device device = event.getDevice();
            
            // Validate device compliance
            ComplianceResult compliance = complianceService
                .validateDevice(device);
            
            if (compliance.isCompliant()) {
                // Trigger provisioning workflow
                workflowOrchestrator.startProvisioning(device.getId());
                
                // Set up monitoring
                monitoringService.enableDeviceMonitoring(device);
                
                log.info("Device {} successfully registered and monitored", 
                    device.getId());
            }
        } catch (Exception e) {
            // Dead letter queue for failed processing
            deadLetterService.handleFailedRegistration(event, e);
        }
    }
}`,
      language: 'java'
    },
    tradeOffs: {
      decision: 'Used Azure Logic Apps for workflow orchestration instead of custom Spring Boot workflows',
      rationale: 'Azure Logic Apps provided built-in SOC 2 compliance, visual workflow design, and managed scaling, reducing development time by 40% while ensuring enterprise security requirements.',
      alternatives: 'Custom Spring Boot workflows would have provided more control and potentially better performance, but would have required significant compliance and security implementation.'
    },
    results: [
      '30-60% reduction in operational costs and deployment time',
      '99.9% uptime for IoT device management',
      'SOC 2 Type II compliance achieved in 6 months',
      'Scaled from 1,000 to 15,000 managed devices'
    ],
    lessons: [
      'Cloud-native workflow tools accelerate compliance requirements',
      'Event-driven architecture essential for IoT scalability',
      'Monitoring and observability must be built-in from day one'
    ]
  },

  'high-throughput-microservices-refactor': {
    slug: 'high-throughput-microservices-refactor',
    title: 'High-Throughput Microservices Refactor',
    company: 'TCS',
    role: 'Senior Software Engineer',
    technologies: ['Java', 'Spring Batch', 'Microservices', 'Kafka', 'Docker', 'Linux', 'Git'],
    impactMetric: 80,
    impactUnit: '% Improvement in Report Generation Speed',
    summary: 'Led architectural refactoring of monolithic reporting system into distributed microservices with blue-green deployment strategy and advanced caching mechanisms.',
    challenge: 'Legacy monolithic reporting system took 4-6 hours to generate critical business reports, causing delays in decision-making and customer satisfaction issues.',
    solution: 'Decomposed monolith into 12 specialized microservices with event-driven architecture, implemented distributed caching, and optimized data processing pipelines.',
    architectureDiagram: microservicesRefactorDiagram,
    deepDiveCode: {
      title: 'Distributed Caching with Spring Boot',
      description: 'Implemented Redis-based distributed caching with intelligent cache invalidation to achieve 80% performance improvement.',
      code: `@Service
@CacheConfig(cacheNames = "reportData")
public class ReportGenerationService {
    
    @Autowired
    private RedisTemplate<String, Object> redisTemplate;
    
    @Cacheable(key = "#reportType + '_' + #dateRange")
    @HystrixCommand(fallbackMethod = "generateReportFallback")
    public ReportData generateReport(String reportType, DateRange dateRange) {
        
        // Check for distributed lock to prevent duplicate processing
        String lockKey = "report_generation_" + reportType;
        Boolean acquired = redisTemplate.opsForValue()
            .setIfAbsent(lockKey, "locked", Duration.ofMinutes(30));
            
        if (!acquired) {
            return waitForCachedResult(reportType, dateRange);
        }
        
        try {
            // Process in parallel streams for performance
            List<DataChunk> chunks = dataPartitionService
                .partitionData(reportType, dateRange);
                
            List<ProcessedChunk> results = chunks.parallelStream()
                .map(chunk -> processChunk(chunk))
                .collect(Collectors.toList());
                
            ReportData report = aggregateResults(results);
            
            // Cache with TTL based on data freshness requirements
            cacheReport(report, reportType, dateRange);
            return report;
            
        } finally {
            redisTemplate.delete(lockKey);
        }
    }
}`,
      language: 'java'
    },
    tradeOffs: {
      decision: 'Implemented blue-green deployment over rolling updates for zero-downtime deployments',
      rationale: 'Blue-green deployment provided instant rollback capability and eliminated partial-state issues during high-traffic report generation periods, despite requiring 2x infrastructure resources.',
      alternatives: 'Rolling updates would have reduced infrastructure costs but introduced complexity in maintaining data consistency during partial deployments.'
    },
    results: [
      '80% improvement in report generation speed (6 hours → 1.2 hours)',
      'Zero-downtime deployments achieved with blue-green strategy',
      '99.99% system availability during business hours',
      '60% reduction in infrastructure costs through optimized resource usage'
    ],
    lessons: [
      'Distributed caching is critical for high-throughput data processing',
      'Microservices require sophisticated monitoring and observability',
      'Blue-green deployments worth the infrastructure cost for mission-critical systems'
    ]
  }
};

export const getCaseStudy = (slug: string): CaseStudy | undefined => {
  console.log('Looking for case study with slug:', slug);
  console.log('Available slugs:', Object.keys(caseStudies));
  const result = caseStudies[slug];
  console.log('Found case study:', result ? result.title : 'Not found');
  return result;
};

export const getAllCaseStudies = (): CaseStudy[] => {
  return Object.values(caseStudies);
};