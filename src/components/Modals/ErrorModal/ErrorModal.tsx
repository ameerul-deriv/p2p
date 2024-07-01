import { TGenericSizes } from '@/utils';
import { Localize } from '@deriv-com/translations';
import { Button, Modal, Text, useDevice } from '@deriv-com/ui';
import './ErrorModal.scss';

type TErrorModalProps = {
    buttonText?: string;
    hideCloseIcon?: boolean;
    isModalOpen: boolean;
    message?: string;
    onRequestClose: () => void;
    showTitle?: boolean;
    textSize?: TGenericSizes;
    title?: string;
};

const ErrorModal = ({
    buttonText,
    hideCloseIcon = false,
    isModalOpen,
    message,
    onRequestClose,
    showTitle = true,
    textSize,
    title,
}: TErrorModalProps) => {
    const { isMobile } = useDevice();
    const defaultTextSize = isMobile ? 'md' : 'sm';
    return (
        <Modal ariaHideApp={false} className='error-modal' isOpen={isModalOpen} shouldCloseOnOverlayClick={false}>
            {showTitle && (
                <Modal.Header
                    className='lg:pl-[2.4rem] pl-[1.6rem]'
                    hideBorder
                    hideCloseIcon={hideCloseIcon}
                    onRequestClose={onRequestClose}
                >
                    <Text size={textSize ?? defaultTextSize} weight='bold'>
                        {title ?? <Localize i18n_default_text='Something’s not right' />}
                    </Text>
                </Modal.Header>
            )}
            <Modal.Body className='error-modal__body'>
                <Text size={defaultTextSize}>{message ?? <Localize i18n_default_text='Something’s not right' />}</Text>
            </Modal.Body>
            <Modal.Footer hideBorder>
                <Button onClick={onRequestClose} size='lg' textSize='sm'>
                    {buttonText ?? <Localize i18n_default_text='OK' />}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ErrorModal;
