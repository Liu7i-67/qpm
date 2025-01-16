import {Modal, ModalBaseProps, Pressable, View} from 'react-native';
import {QIcon} from './QIcon';
import {globalColor} from '../globalStyle';
import React from 'react';

export interface IQDrawerProps extends ModalBaseProps {
  children?: React.ReactNode;
}

export const QDrawer = React.memo(function QDrawer_(props: IQDrawerProps) {
  return (
    <Modal
      animationType="slide"
      visible={props.visible}
      transparent={true}
      onRequestClose={props.onRequestClose}
      style={{position: 'relative'}}>
      <View
        style={{
          backgroundColor: globalColor.backgroundEE,
          width: '80%',
          height: '100%',
          borderRightWidth: 1,
        }}>
        {props.children}
      </View>
      <View style={{position: 'absolute', width: '20%', right: 0, top: '45%'}}>
        <Pressable
          style={{
            width: '50%',
            backgroundColor: globalColor.backgroundEE,
            paddingVertical: 16,
            paddingHorizontal: 4,
            borderWidth: 1,
            borderLeftWidth: 0,
            borderTopRightRadius: 16,
            borderBottomRightRadius: 16,
          }}
          onPress={props.onRequestClose}>
          <QIcon type="close" />
        </Pressable>
      </View>
    </Modal>
  );
});
