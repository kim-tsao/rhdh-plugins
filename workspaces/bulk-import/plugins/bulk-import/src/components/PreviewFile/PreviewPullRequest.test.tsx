/*
 * Copyright Red Hat, Inc.
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

import { useState } from 'react';

import { configApiRef, errorApiRef } from '@backstage/core-plugin-api';
import { translationApiRef } from '@backstage/core-plugin-api/alpha';
import { CatalogApi, catalogApiRef } from '@backstage/plugin-catalog-react';
import {
  mockApis,
  MockConfigApi,
  MockErrorApi,
  TestApiProvider,
} from '@backstage/test-utils';

import { render } from '@testing-library/react';
import { useFormikContext } from 'formik';

import { mockGetRepositories } from '../../mocks/mockData';
import { mockEntities } from '../../mocks/mockEntities';
import { ApprovalTool, RepositoryStatus } from '../../types';
import { getPRTemplate } from '../../utils/repository-utils';
import { PreviewPullRequest } from './PreviewPullRequest';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

jest.mock('formik', () => ({
  ...jest.requireActual('formik'),
  useFormikContext: jest.fn(),
}));

const setState = jest.fn();

jest.mock('./PreviewPullRequestForm', () => ({
  PreviewPullRequestForm: () => <div data-testid="mock-form" />,
}));

beforeEach(() => {
  (useState as jest.Mock).mockImplementation(initial => [initial, setState]);
});

const mockCatalogApi: Partial<CatalogApi> = {
  getEntities: jest.fn().mockReturnValue(mockEntities),
};

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <TestApiProvider
      apis={[
        [errorApiRef, new MockErrorApi()],
        [translationApiRef, mockApis.translation()],
        [
          configApiRef,
          new MockConfigApi({
            catalog: {
              import: {
                entityFilename: 'test.yaml',
              },
            },
          }),
        ],
        [catalogApiRef, mockCatalogApi],
      ]}
    >
      {ui}
    </TestApiProvider>,
  );
};

describe('Preview Pull Request', () => {
  it('should show warning panel with error if PR fails', async () => {
    (useFormikContext as jest.Mock).mockReturnValue({
      errors: {},
      status: {
        errors: {
          'org/dessert/cupcake': {
            repository: {
              name: mockGetRepositories.repositories[0].name,
              organization: mockGetRepositories.repositories[0].orgName,
            },
            catalogEntityName: mockGetRepositories.repositories[0].name,
            error: {
              message: [RepositoryStatus.CODEOWNERS_FILE_NOT_FOUND_IN_REPO],
            },
          },
        },
      },
      values: {
        repositories: {
          'org/dessert/cupcake': mockGetRepositories.repositories[0],
        },
        approvalTool: ApprovalTool.Git,
      },
    });

    const { getByText } = renderWithProviders(
      <PreviewPullRequest
        repoId="org/dessert/cupcake"
        repoUrl="https://github.com/org/dessert/cupcake"
        repoBranch="main"
        pullRequest={{
          'org/dessert/cupcake': getPRTemplate(
            'org/dessert/cupcake',
            'org/dessert',
            'user:default/guest',
            'https://localhost:3001',
            'https://github.com/org/dessert/cupcake',
            'main',
          ),
        }}
        setFormErrors={() => jest.fn()}
        formErrors={{}}
        setPullRequest={() => jest.fn()}
      />,
    );
    expect(getByText(/Failed to create PR/)).toBeInTheDocument();
    expect(
      getByText(
        /CODEOWNERS file is missing from the repository. Add a CODEOWNERS file to create a new PR./,
      ),
    ).toBeInTheDocument();
  });

  it('should show info to display important message', async () => {
    (useFormikContext as jest.Mock).mockReturnValue({
      errors: {},
      status: {
        infos: {
          'org/dessert/cupcake': {
            repository: {
              name: mockGetRepositories.repositories[0].name,
              organization: mockGetRepositories.repositories[0].orgName,
            },
            catalogEntityName: mockGetRepositories.repositories[0].name,
            error: {
              message: [RepositoryStatus.CATALOG_INFO_FILE_EXISTS_IN_REPO],
            },
          },
        },
      },
      values: {
        repositories: {
          'org/dessert/cupcake': mockGetRepositories.repositories[0],
        },
        approvalTool: ApprovalTool.Git,
      },
    });

    const { getByText } = renderWithProviders(
      <PreviewPullRequest
        repoId="org/dessert/cupcake"
        repoUrl="https://github.com/org/dessert/cupcake"
        repoBranch="main"
        pullRequest={{
          'org/dessert/cupcake': getPRTemplate(
            'org/dessert/cupcake',
            'org/dessert',
            'user:default/guest',
            'https://localhost:3001',
            'https://github.com/org/dessert/cupcake',
            'main',
          ),
        }}
        setFormErrors={() => jest.fn()}
        formErrors={{}}
        setPullRequest={() => jest.fn()}
      />,
    );
    expect(
      getByText(
        /Since catalog-info.yaml already exists in the repository, no new PR will be created. However, the entity will still be registered in the catalog page./,
      ),
    ).toBeInTheDocument();
  });

  it('should show PR link in the info if the job has a PR waiting for approval', async () => {
    (useFormikContext as jest.Mock).mockReturnValue({
      errors: {},
      status: {},
      values: {
        repositories: {
          'org/dessert/cupcake': mockGetRepositories.repositories[0],
        },
        approvalTool: ApprovalTool.Git,
      },
    });

    const { getByTestId } = renderWithProviders(
      <PreviewPullRequest
        repoId="org/dessert/cupcake"
        repoUrl="https://github.com/org/dessert/cupcake"
        repoBranch="main"
        pullRequest={{
          'org/dessert/cupcake': {
            ...getPRTemplate(
              'org/dessert/cupcake',
              'org/dessert',
              'user:default/guest',
              'https://localhost:3001',
              'https://github.com/org/dessert/cupcake',
              'main',
            ),
            pullRequestUrl: 'https://github.com/org/dessert/cupcake/pulls/9',
          },
        }}
        setFormErrors={() => jest.fn()}
        formErrors={{}}
        setPullRequest={() => jest.fn()}
      />,
    );
    expect(getByTestId('pull-request-info')).toBeInTheDocument();
  });

  it('should show an info if entity YAML is invalid', async () => {
    (useFormikContext as jest.Mock).mockReturnValue({
      errors: {},
      status: {
        infos: {
          ['org/dessert/cupcake']: {
            error: { message: ['invalid entity YAML'] },
          },
        },
      },
      values: {
        repositories: {
          'org/dessert/cupcake': mockGetRepositories.repositories[0],
        },
        approvalTool: ApprovalTool.Git,
      },
    });

    const { getByTestId, getByText } = renderWithProviders(
      <PreviewPullRequest
        repoId="org/dessert/cupcake"
        repoUrl="https://github.com/org/dessert/cupcake"
        repoBranch="main"
        pullRequest={{
          'org/dessert/cupcake': {
            ...getPRTemplate(
              'org/dessert/cupcake',
              'org/dessert',
              'user:default/guest',
              'https://localhost:3001',
              'https://github.com/org/dessert/cupcake',
              'main',
            ),
            pullRequestUrl: 'https://github.com/org/dessert/cupcake/pulls/9',
          },
        }}
        setFormErrors={() => jest.fn()}
        formErrors={{}}
        setPullRequest={() => jest.fn()}
      />,
    );
    expect(getByTestId('other-info')).toBeInTheDocument();
    expect(getByText('invalid entity YAML')).toBeInTheDocument();
    expect(getByTestId('pull-request-info')).toBeInTheDocument();
  });
});
