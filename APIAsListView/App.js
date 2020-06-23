/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  FlatList,
  ListView,
} from 'react-native';

const App: () => React$Node = () => {
  return (
    <>
      <SafeAreaView>
        <View style={styles.container}>
          <FlatList
            data={[
              {key: 0, initial: 'RN', name: 'Riya Narayan'},
              {key: 1, initial: 'SN', name: 'Sana Narayan'},
              {key: 2, initial: 'PN', name: 'Pankaj Narayan'},
              {key: 3, initial: 'SN', name: 'Shefali Narayan'},
              {key: 4, initial: 'MN', name: 'Mars Narayan'},
              {key: 5, initial: 'AW', name: 'Alex Wang'},
              {key: 6, initial: 'NM', name: 'Naviya Makhija'},
              {key: 7, initial: 'AM', name: 'Anushree Mehta'},
              {key: 8, initial: 'AA', name: 'Anjolie Arora'},
              {key: 9, initial: 'SK', name: 'Samiksha Kattera'},
            ]}
            renderItem={({item}) => (
              <View id={item.key} style={styles.container}>
                <Text style={styles.initial}>{item.initial}</Text>
                <Text style={styles.name}>{item.name}</Text>
              </View>
            )}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingTop: 20,
    flexDirection: 'row',
  },
  initial: {
    paddingRight: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 20,
  },
});

export default App;
