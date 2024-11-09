import React from 'react';
import { View, StyleSheet } from 'react-native';
import CarList from '../components/CarList';

type DefaultTopBarProps = {
  children?: React.ReactNode;
  body?: React.ReactNode;
  leftComponent?: React.ReactNode;
  rightComponent?: React.ReactNode;
};

export function DefaultTopBar({ children, body, leftComponent, rightComponent }: DefaultTopBarProps) {
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <View style={styles.sideContainer}>{leftComponent}</View>

        <View style={styles.centerContainer}>
          {children}
        </View>

        <View style={styles.sideContainer}>{rightComponent}</View>
      </View>

      <View style={styles.body}>
        {<CarList />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    height: 70,
    backgroundColor: '#f5f5f5',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  sideContainer: {
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    marginTop: 40
  },
});
