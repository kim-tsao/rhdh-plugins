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

import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { ComboBox } from './ComboBox';

const useFiltersStyles = makeStyles(
  theme => ({
    root: {
      height: '100%',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      marginRight: theme.spacing(3),
    },
    value: {
      fontWeight: 'bold',
      fontSize: 18,
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      height: theme.spacing(7.5),
      justifyContent: 'space-between',
      borderBottom: `1px solid ${theme.palette.grey[500]}`,
    },
    filters: {
      display: 'flex',
      flexDirection: 'column',
      '& > *': {
        marginTop: theme.spacing(2),
      },
    },
  }),
  { name: 'BackstageTableFilters' },
);

const filterFieldIds = [
  'cluster',
  'project',
  'workload',
  'workloadType',
] as const;

/** @public */
export type FiltersProps = {
  cluster: { label: string; options: string[] };
  project: { label: string; options: string[] };
  workload: { label: string; options: string[] };
  workloadType: { label: string; options: string[] };
  onFiltersChange: (
    fieldId: 'cluster' | 'project' | 'workload' | 'workloadType',
    values: string[],
  ) => void;
  onFiltersReset: () => void;
};

/** @public */
export function Filters(props: FiltersProps) {
  const { onFiltersChange, onFiltersReset, ...filters } = props;
  const classes = useFiltersStyles();
  const [globalKeyId, setGlobalKeyId] = useState(0); // Used for reseting the ComboBoxes internal state

  return (
    <Box className={classes.root}>
      <Box className={classes.header}>
        <Box className={classes.value}>Filters</Box>
        <Button
          color="primary"
          onClick={(_): void => {
            onFiltersReset();
            setGlobalKeyId(globalKeyId + 1);
          }}
        >
          Reset
        </Button>
      </Box>
      <Box className={classes.filters}>
        {filterFieldIds.map(ffid => (
          <ComboBox
            multiple
            freeSolo
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            filterSelectedOptions
            key={`${ffid}-${globalKeyId}`}
            label={filters[ffid].label}
            options={filters[ffid].options}
            onChange={(_, values): void => {
              onFiltersChange(ffid, values);
            }}
          />
        ))}
      </Box>
    </Box>
  );
}
