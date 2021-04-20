/* @flow strict-local */
import React from 'react';
import { View } from 'react-native';

import { RawLabel, Touchable } from '.';
import { BRAND_COLOR, createStyleSheet } from '../styles';
import { IconDone } from './Icons';

const styles = createStyleSheet({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
  },
  subtitle: {
    fontWeight: '300',
    fontSize: 13,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 16,
    paddingRight: 16,
  },
});

type Props<TItemKey: string | number> = $ReadOnly<{|
  itemKey: TItemKey,
  subtitle: string,
  title: string,
  selected: boolean,

  // We might have called this `onPress`, but
  // - pressing just happens to be how this component wants the user
  //   to manually select/deselect
  // - callers don't have a license to do whatever they want here; see
  //   note in jsdoc
  onRequestSelectionChange: (itemKey: TItemKey, requestedValue: boolean) => void,
|}>;

/**
 * A labeled row for an item among related items; shows a checkmark
 *   when selected.
 *
 * NOTE: This isn't an all-purpose action button. The component has
 * two essential states: selected and deselected. These must clearly
 * represent two states in the app; e.g., for each supported locale,
 * it is either active or not. The event handler shouldn't do random
 * things that aren't related to that state, like navigating to a
 * different screen.
 */
export default function SelectableOptionRow<TItemKey: string | number>(props: Props<TItemKey>) {
  const { itemKey, subtitle, title, selected, onRequestSelectionChange } = props;

  return (
    <Touchable onPress={() => onRequestSelectionChange(itemKey, !selected)}>
      <View style={styles.listItem}>
        <View style={styles.wrapper}>
          <RawLabel text={title} />
          <RawLabel text={subtitle} style={styles.subtitle} />
        </View>
        <View>{selected && <IconDone size={16} color={BRAND_COLOR} />}</View>
      </View>
    </Touchable>
  );
}