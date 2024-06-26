import { MouseEventHandler } from 'react';
import { Button } from '@deriv-com/ui';
import { ReactComponent as AttachmentIcon } from '../../../../public/ic-attachment.svg';
import { ReactComponent as SendMessageIcon } from '../../../../public/ic-send-message.svg';

type TChatFooterIconProps = {
    length: number;
    onClick: MouseEventHandler<HTMLButtonElement>;
};

const ChatFooterIcon = ({ length, onClick }: TChatFooterIconProps) => {
    return (
        <Button
            className='h-full p-0'
            color='white'
            icon={length > 0 ? <SendMessageIcon /> : <AttachmentIcon />}
            onClick={onClick}
            type='button'
            variant='contained'
        />
    );
};

export default ChatFooterIcon;
