## API Report File for "@red-hat-developer-hub/plugin-redhat-resource-optimization-common"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts
import { DiscoveryApi } from '@backstage/core-plugin-api';
import { FetchApi } from '@backstage/core-plugin-api';
import { IdentityApi } from '@backstage/core-plugin-api';
import type { JsonObject } from '@backstage/types';

// @public (undocumented)
export interface CostRecommendation {
  // (undocumented)
  config?: CostRecommendationConfig;
  // (undocumented)
  notifications?: CostRecommendationNotifications;
  // (undocumented)
  podsCount?: number;
  // (undocumented)
  variation?: CostRecommendationVariation;
}

// @public (undocumented)
export interface CostRecommendationConfig {
  // (undocumented)
  limits?: CostRecommendationConfigLimits;
  // (undocumented)
  requests?: CostRecommendationConfigRequests;
}

// @public (undocumented)
export interface CostRecommendationConfigLimits {
  // (undocumented)
  cpu?: CostRecommendationConfigLimitsCpu;
  // (undocumented)
  memory?: CostRecommendationConfigLimitsMemory;
}

// @public (undocumented)
export interface CostRecommendationConfigLimitsCpu {
  // (undocumented)
  amount?: number;
  // (undocumented)
  format?: string | null;
}

// @public (undocumented)
export interface CostRecommendationConfigLimitsMemory {
  // (undocumented)
  amount?: number;
  // (undocumented)
  format?: string;
}

// @public (undocumented)
export interface CostRecommendationConfigRequests {
  // (undocumented)
  cpu?: CostRecommendationConfigRequestsCpu;
  // (undocumented)
  memory?: CostRecommendationConfigRequestsMemory;
}

// @public (undocumented)
export interface CostRecommendationConfigRequestsCpu {
  // (undocumented)
  amount?: number;
  // (undocumented)
  format?: string | null;
}

// @public (undocumented)
export interface CostRecommendationConfigRequestsMemory {
  // (undocumented)
  amount?: number;
  // (undocumented)
  format?: string;
}

// @public (undocumented)
export interface CostRecommendationNotifications {
  // (undocumented)
  _323004?: CPURequestOptimisedNotification323004;
  // (undocumented)
  _323005?: CPULimitOptimisedNotification323005;
  // (undocumented)
  _324003?: MemoryRequestOptimisedNotification324003;
  // (undocumented)
  _324004?: MemoryLimitOptimisedNotification324004;
}

// @public (undocumented)
export interface CostRecommendationVariation {
  // (undocumented)
  limits?: CostRecommendationVariationLimits;
  // (undocumented)
  requests?: CostRecommendationVariationRequests;
}

// @public (undocumented)
export interface CostRecommendationVariationLimits {
  // (undocumented)
  cpu?: CostRecommendationVariationLimitsCpu;
  // (undocumented)
  memory?: CostRecommendationVariationLimitsMemory;
}

// @public (undocumented)
export interface CostRecommendationVariationLimitsCpu {
  // (undocumented)
  amount?: number;
  // (undocumented)
  format?: string | null;
}

// @public (undocumented)
export interface CostRecommendationVariationLimitsMemory {
  // (undocumented)
  amount?: number;
  // (undocumented)
  format?: string;
}

// @public (undocumented)
export interface CostRecommendationVariationRequests {
  // (undocumented)
  cpu?: CostRecommendationVariationRequestsCpu;
  // (undocumented)
  memory?: CostRecommendationVariationRequestsMemory;
}

// @public (undocumented)
export interface CostRecommendationVariationRequestsCpu {
  // (undocumented)
  amount?: number;
  // (undocumented)
  format?: string | null;
}

// @public (undocumented)
export interface CostRecommendationVariationRequestsMemory {
  // (undocumented)
  amount?: number;
  // (undocumented)
  format?: string;
}

// @public (undocumented)
export interface CPULimitOptimisedNotification {
  // (undocumented)
  _323005?: CPULimitOptimisedNotification323005;
}

// @public (undocumented)
export interface CPULimitOptimisedNotification323005 {
  // (undocumented)
  code?: number;
  // (undocumented)
  message?: string;
  // (undocumented)
  type?: string;
}

// @public (undocumented)
export interface CPURequestOptimisedNotification {
  // (undocumented)
  _323004?: CPURequestOptimisedNotification323004;
}

// @public (undocumented)
export interface CPURequestOptimisedNotification323004 {
  // (undocumented)
  code?: number;
  // (undocumented)
  message?: string;
  // (undocumented)
  type?: string;
}

// @public (undocumented)
export interface CpuUsage {
  // (undocumented)
  format?: string;
  // (undocumented)
  max?: number;
  // (undocumented)
  median?: number;
  // (undocumented)
  min?: number;
  // (undocumented)
  q1?: number;
  // (undocumented)
  q3?: number;
}

// @public
export class DefaultApiClient {
  constructor(options: {
    discoveryApi: {
      getBaseUrl(pluginId: string): Promise<string>;
    };
    fetchApi?: {
      fetch: typeof fetch;
    };
  });
  getRecommendationById(
    request: {
      path: {
        recommendationId: string;
      };
      query: {
        memoryUnit?: 'bytes' | 'MiB' | 'GiB';
        cpuUnit?: 'millicores' | 'cores';
      };
    },
    options?: RequestOptions,
  ): Promise<TypedResponse<RecommendationBoxPlots>>;
  getRecommendationList(
    request: {
      query: {
        cluster?: Array<string>;
        workloadType?: Array<string>;
        workload?: Array<string>;
        container?: Array<string>;
        project?: Array<string>;
        startDate?: string;
        endDate?: string;
        offset?: number;
        limit?: number;
        orderBy?:
          | 'cluster'
          | 'project'
          | 'workload_type'
          | 'workload'
          | 'container'
          | 'last_reported';
        orderHow?: 'asc' | 'desc';
      };
    },
    options?: RequestOptions,
  ): Promise<TypedResponse<RecommendationList>>;
}

// @public (undocumented)
export interface GetAccessResponse {
  // (undocumented)
  authorizeClusterIds: string[];
  // (undocumented)
  authorizeProjects: string[];
  // (undocumented)
  decision: string;
}

// @public (undocumented)
export type GetRecommendationByIdRequest = Parameters<
  OptimizationsApi['getRecommendationById']
>[0];

// @public (undocumented)
export type GetRecommendationListRequest = Parameters<
  OptimizationsApi['getRecommendationList']
>[0];

// @public
export interface GetTokenResponse {
  // (undocumented)
  accessToken: string;
  expiresAt: number;
}

// @public (undocumented)
export interface LongTermRecommendation {
  // (undocumented)
  durationInHours?: number;
  // (undocumented)
  monitoringStartTime?: Date;
  // (undocumented)
  recommendationEngines?: LongTermRecommendationRecommendationEngines;
}

// @public (undocumented)
export interface LongTermRecommendationBoxPlots {
  // (undocumented)
  durationInHours?: number;
  // (undocumented)
  monitoringStartTime?: Date;
  // (undocumented)
  plots?: PlotsData;
  // (undocumented)
  recommendationEngines?: LongTermRecommendationRecommendationEngines;
}

// @public (undocumented)
export interface LongTermRecommendationRecommendationEngines {
  // (undocumented)
  cost?: CostRecommendation;
  // (undocumented)
  performance?: PerformanceRecommendation;
}

// @public (undocumented)
export interface MediumTermRecommendation {
  // (undocumented)
  durationInHours?: number;
  // (undocumented)
  monitoringStartTime?: Date;
  // (undocumented)
  recommendationEngines?: LongTermRecommendationRecommendationEngines;
}

// @public (undocumented)
export interface MediumTermRecommendationBoxPlots {
  // (undocumented)
  durationInHours?: number;
  // (undocumented)
  monitoringStartTime?: Date;
  // (undocumented)
  plots?: PlotsData;
  // (undocumented)
  recommendationEngines?: LongTermRecommendationRecommendationEngines;
}

// @public (undocumented)
export interface MemoryLimitOptimisedNotification {
  // (undocumented)
  _324004?: MemoryLimitOptimisedNotification324004;
}

// @public (undocumented)
export interface MemoryLimitOptimisedNotification324004 {
  // (undocumented)
  code?: number;
  // (undocumented)
  message?: string;
  // (undocumented)
  type?: string;
}

// @public (undocumented)
export interface MemoryRequestOptimisedNotification {
  // (undocumented)
  _324003?: MemoryRequestOptimisedNotification324003;
}

// @public (undocumented)
export interface MemoryRequestOptimisedNotification324003 {
  // (undocumented)
  code?: number;
  // (undocumented)
  message?: string;
  // (undocumented)
  type?: string;
}

// @public (undocumented)
export interface MemoryUsage {
  // (undocumented)
  format?: string;
  // (undocumented)
  max?: number;
  // (undocumented)
  median?: number;
  // (undocumented)
  min?: number;
  // (undocumented)
  q1?: number;
  // (undocumented)
  q3?: number;
}

// @public (undocumented)
export type OptimizationsApi = Omit<
  InstanceType<typeof DefaultApiClient>,
  'fetchApi' | 'discoveryApi'
>;

// @public
export class OptimizationsClient implements OptimizationsApi {
  constructor(options: { discoveryApi: DiscoveryApi; fetchApi?: FetchApi });
  // (undocumented)
  getRecommendationById(
    request: GetRecommendationByIdRequest,
  ): Promise<TypedResponse<RecommendationBoxPlots>>;
  // (undocumented)
  getRecommendationList(
    request: GetRecommendationListRequest,
  ): Promise<TypedResponse<RecommendationList>>;
}

// @public (undocumented)
export interface OrchestratorSlimApi {
  // (undocumented)
  executeWorkflow<D = JsonObject>(
    workflowId: string,
    workflowInputData: D,
  ): Promise<{
    id: string;
  }>;
  // (undocumented)
  isWorkflowAvailable(workflowId: string): Promise<boolean>;
}

// @public (undocumented)
export class OrchestratorSlimClient implements OrchestratorSlimApi {
  constructor(options: {
    discoveryApi: DiscoveryApi;
    fetchApi: FetchApi;
    identityApi: IdentityApi;
  });
  // (undocumented)
  executeWorkflow<D = JsonObject>(
    workflowId: string,
    workflowInputData: D,
  ): Promise<{
    id: string;
  }>;
  // (undocumented)
  isWorkflowAvailable(workflowId: string): Promise<boolean>;
}

// @public (undocumented)
export interface PerformanceRecommendation {
  // (undocumented)
  config?: PerformanceRecommendationConfig;
  // (undocumented)
  notifications?: CostRecommendationNotifications;
  // (undocumented)
  podsCount?: number;
  // (undocumented)
  variation?: PerformanceRecommendationVariation;
}

// @public (undocumented)
export interface PerformanceRecommendationConfig {
  // (undocumented)
  limits?: PerformanceRecommendationConfigLimits;
  // (undocumented)
  requests?: PerformanceRecommendationConfigRequests;
}

// @public (undocumented)
export interface PerformanceRecommendationConfigLimits {
  // (undocumented)
  cpu?: PerformanceRecommendationConfigLimitsCpu;
  // (undocumented)
  memory?: PerformanceRecommendationConfigLimitsMemory;
}

// @public (undocumented)
export interface PerformanceRecommendationConfigLimitsCpu {
  // (undocumented)
  amount?: number;
  // (undocumented)
  format?: string | null;
}

// @public (undocumented)
export interface PerformanceRecommendationConfigLimitsMemory {
  // (undocumented)
  amount?: number;
  // (undocumented)
  format?: string;
}

// @public (undocumented)
export interface PerformanceRecommendationConfigRequests {
  // (undocumented)
  cpu?: PerformanceRecommendationConfigRequestsCpu;
  // (undocumented)
  memory?: PerformanceRecommendationConfigRequestsMemory;
}

// @public (undocumented)
export interface PerformanceRecommendationConfigRequestsCpu {
  // (undocumented)
  amount?: number;
  // (undocumented)
  format?: string | null;
}

// @public (undocumented)
export interface PerformanceRecommendationConfigRequestsMemory {
  // (undocumented)
  amount?: number;
  // (undocumented)
  format?: string;
}

// @public (undocumented)
export interface PerformanceRecommendationVariation {
  // (undocumented)
  limits?: PerformanceRecommendationVariationLimits;
  // (undocumented)
  requests?: PerformanceRecommendationVariationRequests;
}

// @public (undocumented)
export interface PerformanceRecommendationVariationLimits {
  // (undocumented)
  cpu?: PerformanceRecommendationVariationLimitsCpu;
  // (undocumented)
  memory?: PerformanceRecommendationVariationLimitsMemory;
}

// @public (undocumented)
export interface PerformanceRecommendationVariationLimitsCpu {
  // (undocumented)
  amount?: number;
  // (undocumented)
  format?: string | null;
}

// @public (undocumented)
export interface PerformanceRecommendationVariationLimitsMemory {
  // (undocumented)
  amount?: number;
  // (undocumented)
  format?: string;
}

// @public (undocumented)
export interface PerformanceRecommendationVariationRequests {
  // (undocumented)
  cpu?: PerformanceRecommendationVariationRequestsCpu;
  // (undocumented)
  memory?: CostRecommendationVariationLimitsMemory;
}

// @public (undocumented)
export interface PerformanceRecommendationVariationRequestsCpu {
  // (undocumented)
  amount?: number;
  // (undocumented)
  format?: string | null;
}

// @public (undocumented)
export interface PlotDetailsValue {
  // (undocumented)
  cpuUsage?: CpuUsage;
  // (undocumented)
  memoryUsage?: MemoryUsage;
}

// @public (undocumented)
export interface PlotsData {
  // (undocumented)
  datapoints?: number;
  // (undocumented)
  plotsData?: {
    [key: string]: PlotDetailsValue;
  };
}

// @public (undocumented)
export interface RecommendationBoxPlots {
  // (undocumented)
  clusterAlias?: string;
  // (undocumented)
  clusterUuid?: string;
  // (undocumented)
  container?: string;
  // (undocumented)
  id?: string;
  // (undocumented)
  lastReported?: Date;
  // (undocumented)
  project?: string;
  // (undocumented)
  recommendations?: RecommendationBoxPlotsRecommendations;
  // (undocumented)
  sourceId?: string;
  // (undocumented)
  workload?: string;
  // (undocumented)
  workloadType?: string;
}

// @public (undocumented)
export interface RecommendationBoxPlotsRecommendations {
  // (undocumented)
  current?: RecommendationsRecommendationsCurrent;
  // (undocumented)
  monitoringEndTime?: Date;
  // (undocumented)
  recommendationTerms?: RecommendationBoxPlotsRecommendationsRecommendationTerms;
}

// @public (undocumented)
export interface RecommendationBoxPlotsRecommendationsRecommendationTerms {
  // (undocumented)
  longTerm?: LongTermRecommendationBoxPlots;
  // (undocumented)
  mediumTerm?: MediumTermRecommendationBoxPlots;
  // (undocumented)
  shortTerm?: ShortTermRecommendationBoxPlots;
}

// @public (undocumented)
export interface RecommendationList {
  // (undocumented)
  data?: Array<Recommendations>;
  // (undocumented)
  links?: RecommendationListLinks;
  // (undocumented)
  meta?: RecommendationListMeta;
}

// @public (undocumented)
export interface RecommendationListLinks {
  // (undocumented)
  first?: string;
  // (undocumented)
  last?: string;
  // (undocumented)
  next?: string;
  // (undocumented)
  previous?: string;
}

// @public (undocumented)
export interface RecommendationListMeta {
  // (undocumented)
  count?: number;
  // (undocumented)
  limit?: number;
  // (undocumented)
  offset?: number;
}

// @public (undocumented)
export interface Recommendations {
  // (undocumented)
  clusterAlias?: string;
  // (undocumented)
  clusterUuid?: string;
  // (undocumented)
  container?: string;
  // (undocumented)
  id?: string;
  // (undocumented)
  lastReported?: Date;
  // (undocumented)
  project?: string;
  // (undocumented)
  recommendations?: RecommendationsRecommendations;
  // (undocumented)
  sourceId?: string;
  // (undocumented)
  workload?: string;
  // (undocumented)
  workloadType?: string;
}

// @public (undocumented)
export interface RecommendationsRecommendations {
  // (undocumented)
  current?: RecommendationsRecommendationsCurrent;
  // (undocumented)
  monitoringEndTime?: Date;
  // (undocumented)
  recommendationTerms?: RecommendationsRecommendationsRecommendationTerms;
}

// @public (undocumented)
export interface RecommendationsRecommendationsCurrent {
  // (undocumented)
  limits?: RecommendationsRecommendationsCurrentLimits;
  // (undocumented)
  requests?: RecommendationsRecommendationsCurrentRequests;
}

// @public (undocumented)
export interface RecommendationsRecommendationsCurrentLimits {
  // (undocumented)
  cpu?: RecommendationsRecommendationsCurrentLimitsCpu;
  // (undocumented)
  memory?: RecommendationsRecommendationsCurrentLimitsMemory;
}

// @public (undocumented)
export interface RecommendationsRecommendationsCurrentLimitsCpu {
  // (undocumented)
  amount?: number;
  // (undocumented)
  format?: string | null;
}

// @public (undocumented)
export interface RecommendationsRecommendationsCurrentLimitsMemory {
  // (undocumented)
  amount?: number;
  // (undocumented)
  format?: string;
}

// @public (undocumented)
export interface RecommendationsRecommendationsCurrentRequests {
  // (undocumented)
  cpu?: RecommendationsRecommendationsCurrentLimitsCpu;
  // (undocumented)
  memory?: RecommendationsRecommendationsCurrentRequestsMemory;
}

// @public (undocumented)
export interface RecommendationsRecommendationsCurrentRequestsMemory {
  // (undocumented)
  amount?: number;
  // (undocumented)
  format?: string;
}

// @public (undocumented)
export interface RecommendationsRecommendationsRecommendationTerms {
  // (undocumented)
  longTerm?: LongTermRecommendation;
  // (undocumented)
  mediumTerm?: MediumTermRecommendation;
  // (undocumented)
  shortTerm?: ShortTermRecommendation;
}

// @public
export interface RequestOptions {
  // (undocumented)
  token?: string;
}

// @public (undocumented)
export interface ShortTermRecommendation {
  // (undocumented)
  durationInHours?: number;
  // (undocumented)
  monitoringStartTime?: Date;
  // (undocumented)
  recommendationEngines?: LongTermRecommendationRecommendationEngines;
}

// @public (undocumented)
export interface ShortTermRecommendationBoxPlots {
  // (undocumented)
  durationInHours?: number;
  // (undocumented)
  monitoringStartTime?: Date;
  // (undocumented)
  plots?: PlotsData;
  // (undocumented)
  recommendationEngines?: LongTermRecommendationRecommendationEngines;
}

// @public
export type TypedResponse<T> = Omit<Response, 'json'> & {
  json: () => Promise<T>;
};

// (No @packageDocumentation comment for this package)
```
