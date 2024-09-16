/* Created by Hauntii under the GNU GENERAL PUBLIC LICENSE. Do not remove this line. */
import manifest from '../manifest.json';

import { Plugin, registerPlugin } from 'enmity/managers/plugins';
import { bulk, filters, getByProps } from 'enmity/metro';
import { Dialog, React, Toasts, Users } from 'enmity/metro/common';
import { getIDByName } from 'enmity/api/assets';
import { create } from 'enmity/patcher';
import { TouchableOpacity } from 'enmity/components';
import { get, getBoolean, set } from 'enmity/api/settings';

import Settings from './components/Settings';

const Patcher = create('CustomRecentDMs');

const RecentDMsExperiment = getByProps("RecentDMsInServerBarExperiment")

const CustomRecentDMs: Plugin = {
   ...manifest,

   onStart() {
      RecentDMsExperiment.EXPERIMENT_RECENT_PINNED_DM_COUNT = get('CustomRecentDMs', 'recentsCount', 3)

      Patcher.instead(RecentDMsExperiment.RecentDMsInServerBarExperiment, 'useExperiment', (_self, args, _res) => {
         if (args[0].location === "GuildsBarItemDirectMessages" || get('CustomRecentDMs', 'squareServers', false)) {
            return { showRecentDMs: true }
         }
         return { showRecentDMs: false }
      });
   },

   onStop() {
      Patcher.unpatchAll();
   },

   getSettingsPanel({ settings }) {
      return <Settings settings={settings} />;
   }
};

registerPlugin(CustomRecentDMs);