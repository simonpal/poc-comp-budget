import { Button } from "./Button";
import { Column } from "./Column";
import { Divider } from "./Divider";
import { Grid } from "./Grid";
import { Modal, ModalProps } from "./Modal";

interface ConfirmDialogProps extends ModalProps {
  onConfirm: () => void;
  title: string;
  description: string;
}

export const ConfirmDialog: React.FunctionComponent<ConfirmDialogProps> = ({
  onConfirm,
  title,
  description,
  onClose,
  width,
  visible,
}) => {
  return (
    <Modal blur onClose={onClose} visible={visible} width={width} disableClick>
      <h3>{title}</h3>
      <Divider spacing="l" />
      {/* <ModalContent>{description}</ModalContent> */}
      <p>{description}</p>
      <Divider spacing="l" />
      <Grid spacing="l">
        <Column lg="6" md="6" sm="6" xs="6">
          <Button priority="secondary" onClick={() => onClose()}>
            Cancel
          </Button>
        </Column>
        <Column lg="6" md="6" sm="6" xs="6">
          <Button priority="primary" onClick={() => onConfirm()}>
            Confirm
          </Button>
        </Column>
      </Grid>
    </Modal>
  );
};
