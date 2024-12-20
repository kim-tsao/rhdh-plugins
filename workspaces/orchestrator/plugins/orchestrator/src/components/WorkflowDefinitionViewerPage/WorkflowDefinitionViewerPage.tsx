/*
 * Copyright 2024 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAsync } from 'react-use';

import { InfoCard, ResponseErrorPanel } from '@backstage/core-components';
import {
  useApi,
  useRouteRef,
  useRouteRefParams,
} from '@backstage/core-plugin-api';

import { Button, Grid, Tooltip } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

import {
  orchestratorWorkflowUsePermission,
  orchestratorWorkflowUseSpecificPermission,
} from '@red-hat-developer-hub/backstage-plugin-orchestrator-common';

import { orchestratorApiRef } from '../../api';
import { usePermissionArrayDecision } from '../../hooks/usePermissionArray';
import {
  executeWorkflowRouteRef,
  workflowDefinitionsRouteRef,
} from '../../routes';
import { BaseOrchestratorPage } from '../BaseOrchestratorPage';
import { EditorViewKind, WorkflowEditor } from '../WorkflowEditor';
import WorkflowDefinitionDetailsCard from './WorkflowDefinitionDetailsCard';

export const WorkflowDefinitionViewerPage = () => {
  const { workflowId, format } = useRouteRefParams(workflowDefinitionsRouteRef);
  const orchestratorApi = useApi(orchestratorApiRef);

  const { loading: loadingPermission, allowed: canRun } =
    usePermissionArrayDecision([
      orchestratorWorkflowUsePermission,
      orchestratorWorkflowUseSpecificPermission(workflowId),
    ]);
  const {
    value: workflowOverviewDTO,
    loading,
    error,
  } = useAsync(() => {
    return orchestratorApi.getWorkflowOverview(workflowId);
  }, []);
  const navigate = useNavigate();
  const executeWorkflowLink = useRouteRef(executeWorkflowRouteRef);

  const workflowFormat = useMemo(
    () => (format === 'json' ? 'json' : 'yaml'),
    [format],
  );

  const handleExecute = () => {
    navigate(executeWorkflowLink({ workflowId }));
  };

  return (
    <BaseOrchestratorPage
      title={workflowOverviewDTO?.data.name || workflowId}
      type="Workflows"
      typeLink="/orchestrator"
    >
      <Grid container spacing={2} direction="column" wrap="nowrap">
        {error && (
          <Grid item>
            <ResponseErrorPanel error={error} />
          </Grid>
        )}
        <Grid container item justifyContent="flex-end" spacing={1}>
          <Grid item>
            {loading || loadingPermission ? (
              <Skeleton variant="text" width="5rem" />
            ) : (
              <Tooltip
                title="user not authorized to execute workflow"
                disableHoverListener={canRun}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleExecute}
                  disabled={!canRun}
                >
                  Run
                </Button>
              </Tooltip>
            )}
          </Grid>
        </Grid>
        <Grid item>
          <WorkflowDefinitionDetailsCard
            workflowOverview={workflowOverviewDTO?.data}
            loading={loading}
          />
        </Grid>
        <Grid item>
          <InfoCard title="Workflow definition">
            <div style={{ height: '600px' }}>
              <WorkflowEditor
                kind={EditorViewKind.EXTENDED_DIAGRAM_VIEWER}
                workflowId={workflowId}
                format={workflowFormat}
              />
            </div>
          </InfoCard>
        </Grid>
      </Grid>
    </BaseOrchestratorPage>
  );
};
