import TitledContainer from '@components/general/titled-container';
import ThisMonthSchedule from '@views/Shared/HomePage/ThisMonthSchedule';

function MemberHomePage() {
  return (
    <TitledContainer title="Home">
      <ThisMonthSchedule showDraft={false} />
    </TitledContainer>
  );
}

export default MemberHomePage;
