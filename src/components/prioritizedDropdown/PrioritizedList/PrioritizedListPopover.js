import { useCallback } from 'react';
import PrioritizedList from './PrioritizedList';
import ModalContainer, { create } from 'react-modal-promise';
import PropTypes from 'prop-types';

function PrioritizedListPopOver({ children, ...restProps }) {
  const popover = create(PrioritizedList);

  const openPopover = useCallback(
    (event) => {
      return popover({ ...restProps, anchorEl: event.currentTarget })
        .then((res) => console.debug(res))
        .catch((rej) => console.error(rej));
    },
    [popover, restProps]
  );

  return (
    <div>
      <ModalContainer />
      {children(openPopover)}
    </div>
  );
}

PrioritizedListPopOver.propTypes = {
  children: PropTypes.func.isRequired,
};

export default PrioritizedListPopOver;
