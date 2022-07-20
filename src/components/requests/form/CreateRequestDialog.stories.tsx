import CreateRequestDialog from './CreateRequestDialog';
import { Decorators } from '@utils/storybook/decorators';
import { Button } from '@mui/material';

export default {
  title: 'Requests/Create Request Dialog',
  component: CreateRequestDialog,
  decorators: [Decorators.dateLocalizationProvider],
};

export const Default = () => 
<CreateRequestDialog
  openDialog={true}
  handleClose={() => null}
  handleCreateRequest={() => null}
></CreateRequestDialog>
