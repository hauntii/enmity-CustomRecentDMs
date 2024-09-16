import { FormInput, FormRow, FormSwitch } from 'enmity/components';
import { SettingsStore } from 'enmity/api/settings';
import { React } from 'enmity/metro/common';
import { getByProps } from 'enmity/metro';

interface SettingsProps {
    settings: SettingsStore;
}

const RecentDMsExperiment = getByProps("RecentDMsInServerBarExperiment")

export default ({ settings }: SettingsProps) => {
    return (
        <>
            <FormInput
                title='Amount of recent DMs to display'
                value={settings.get('recentsCount', 3)}
                onChange={(value) => { const sanitizedValue = isNaN(value) ? 3 : value; settings.set('recentsCount', sanitizedValue); RecentDMsExperiment.EXPERIMENT_RECENT_PINNED_DM_COUNT = sanitizedValue }}
            />
            <FormRow
                label='Differentiate shape of recent DMs and Servers'
                trailing={
                    <FormSwitch
                        value={settings.get('squareServers', false)}
                        onValueChange={() => settings.toggle('squareServers', false)}
                    />
                }
            />
        </>
    );
};