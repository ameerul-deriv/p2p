import { useState } from 'react';
import { DailyLimitModal } from '@/components/Modals';
import { api } from '@/hooks';
import { useAdvertiserStats } from '@/hooks/custom-hooks';
import { Button, Text, useDevice } from '@deriv-com/ui';
import './ProfileDailyLimit.scss';

const ProfileDailyLimit = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { isDesktop } = useDevice();
    const { data: advertiserStats } = useAdvertiserStats();
    const { data: activeAccount } = api.account.useActiveAccount();

    return (
        <>
            <div className='profile-daily-limit' data-testid='dt_profile_daily_limit'>
                <Text color='less-prominent' lineHeight='sm' size='xs'>
                    Want to increase your daily limits to{' '}
                    <Text color='less-prominent' lineHeight='sm' size='xs' weight='bold'>
                        {advertiserStats?.daily_buy_limit} {activeAccount?.currency || 'USD'}{' '}
                    </Text>{' '}
                    (buy) and{' '}
                    <Text color='less-prominent' lineHeight='sm' size='xs' weight='bold'>
                        {advertiserStats?.daily_sell_limit} {activeAccount?.currency || 'USD'}{' '}
                    </Text>{' '}
                    (sell)?
                </Text>
                <Button
                    onClick={() => setIsModalOpen(true)}
                    size='sm'
                    textSize={isDesktop ? 'xs' : 'sm'}
                    variant='ghost'
                >
                    Increase my limits
                </Button>
            </div>
            <DailyLimitModal
                currency={activeAccount?.currency || 'USD'}
                isModalOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
            />
        </>
    );
};

export default ProfileDailyLimit;
