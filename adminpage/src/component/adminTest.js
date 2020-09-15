import React from 'react';
import { 
    Log, 
    WalletLog, 
    LogSuccess, 
    LogFund,
    SettingComplete,
    Confirm,
    Verification,
    Setting,
    ChallengeSearch,
    DateSetting,
    ChallengeFilter
} from './adminPopup';

function AdminTest() {
    return (
        <div style={{padding: 50}}>
            <Log />
            <WalletLog />
            <LogSuccess />
            <LogFund />
            <SettingComplete />
            <Confirm />
            <Verification />
            <Setting />
            <ChallengeSearch />
            <DateSetting />
            <ChallengeFilter />
        </div>
    )
}
export default AdminTest;