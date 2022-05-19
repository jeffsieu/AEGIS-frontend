import { PrioritizedListItem } from '../PrioritizedListItem/PrioritizedListItem';
import {
    Paper,
    MenuList
} from '@mui/material'

function PrioritizedList(props) {
    // sort functions go here

    const listComponents = qualifiedMembers.map( (qualifiedMember) => {
        return <PrioritizedListItem callsign={qualifiedMember.callsign} count={qualifiedMember.dutyCount}></PrioritizedListItem>
    });

    return(
        <Paper>
            <MenuList>
                { listComponents }
            </MenuList>
        </Paper>
    );
};

export default PrioritizedList;