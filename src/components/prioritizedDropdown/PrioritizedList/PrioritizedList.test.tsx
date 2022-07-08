import { render } from "@testing-library/react";
import PrioritizedListPopover from "./PrioritizedListPopover";


test('renders component', ()=>{
	render(<PrioritizedListPopover qualifiedMembers={[]} onMemberSelected={(member)=>{}} selectedMember={null}>{(openPopover)=><button>test</button>}</PrioritizedListPopover>)
});