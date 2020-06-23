/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  FlatList,
  ListView,
  ActivityIndicator,
} from 'react-native';

const App: () => React$Node = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://dog.ceo/api/breeds/list/all')
      .then(response => response.json())
      .then(data => {
        let dogs = [];
        Object.keys(data.message).forEach(breed => {
          const dog = {
            key: breed,
            name: breed.charAt(0).toUpperCase() + breed.slice(1),
            types: data.message[breed],
          };
          dogs.push(dog);
        });
        setData(dogs);
      })
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <SafeAreaView>
        <View style={styles.container}>
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <FlatList
              data={data}
              keyExtractor={(item, i) => i.toString()}
              renderItem={({item}, i) => (
                <View id={i} style={styles.container}>
                  <Text style={styles.name}>{item.name}</Text>
                </View>
              )}
            />
          )}
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
