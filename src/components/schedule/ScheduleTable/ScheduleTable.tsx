import { Box } from '@mui/material';
import { useMemo, useState } from 'react';
import ScheduleColumns from '../ScheduleColumns/ScheduleColumns';
import ScheduleRowHeaders from '../ScheduleRowHeaders/ScheduleRowHeaders';
import { ScheduleItemPropsWithoutCallback } from '../ScheduleItem/ScheduleItem';
import { QualifiedMember } from '@typing';
import { iterateDates } from '@utils/helpers/schedule';
import { Backend } from '@typing/backend';

export type ScheduleTableProps = {
  startDate: Date;
  endDate: Date;
  roleInstances: Backend.RoleInstance[];
  scheduleItemsByDay: ScheduleItemPropsWithoutCallback[][];
  onMemberSelected?: (
    date: Date,
    roleInstance: Backend.RoleInstance,
    member: QualifiedMember | null
  ) => void;
  header?: React.ReactElement;
  stickyHeader?: boolean;
  canFilter: boolean;
};

function ScheduleTable(props: ScheduleTableProps) {
  const {
    startDate,
    endDate,
    roleInstances,
    scheduleItemsByDay,
    onMemberSelected,
    header,
    stickyHeader = false,
    canFilter,
  } = props;

  const dates = useMemo(() => {
    return [...iterateDates(startDate, endDate)];
  }, [startDate, endDate]);

  const [selectedRoles, setSelectedRoles] = useState(roleInstances);

  return (
    <Box display="flex" margin="auto" gap={2}>
      <ScheduleRowHeaders
        roleInstances={roleInstances}
        sticky={stickyHeader}
        canFilter={canFilter}
        selectedRoleInstances={selectedRoles}
        onSelectedRoleInstancesChange={setSelectedRoles}
      />
      <Box display="flex" flexDirection="column" flexBasis={0}>
        {header}
        <Box display="flex" gap={1}>
          {dates.map((date, index) => {
            return (
              <ScheduleColumns
                key={index}
                date={date}
                scheduleItems={[
                  ...scheduleItemsByDay[index]
                    .map((scheduleItem, roleIndex) => ({
                      ...scheduleItem,
                      onMemberSelected: onMemberSelected
                        ? (member: QualifiedMember | null) =>
                            onMemberSelected(
                              date,
                              roleInstances[roleIndex],
                              member
                            )
                        : undefined,
                      role: roleInstances[roleIndex],
                    }))
                    .filter((scheduleItem) =>
                      selectedRoles.includes(scheduleItem.role)
                    ),
                ]}
              />
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}

export default ScheduleTable;
