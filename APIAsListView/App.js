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
  SectionList,
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
        let currDogs = [];
        let curr = 'A';
        Object.keys(data.message).forEach(breed => {
          const name = breed.charAt(0).toUpperCase() + breed.slice(1);
          if (name.charAt(0) === curr) {
            currDogs.push(name);
          } else {
            const section = {
              heading: curr,
              data: currDogs,
            };
            dogs.push(section);
            curr = name.charAt(0);
            currDogs = [];
            currDogs.push(name);
          }
        });
        const section = {
          heading: curr,
          data: currDogs,
        };
        dogs.push(section);
        setData(dogs);
      })
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <SafeAreaView style={{marginBottom: 130}}>
        <Text style={styles.title}>List of Dog Breeds</Text>
        <View style={styles.container}>
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <SectionList
              sections={data}
              renderItem={({item}, i) => (
                <View id={i} style={styles.container}>
                  <Text style={styles.name}>{item}</Text>
                </View>
              )}
              renderSectionHeader={({section}) => (
                <Text style={styles.heading}>{section.heading}</Text>
              )}
              keyExtractor={(item, i) => i.toString()}
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
  title: {
    textAlign: 'center',
    paddingTop: 30,
    fontSize: 20,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 18,
    height: 30,
  },
  heading: {
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 5,
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: 'gainsboro',
  },
});

export default App;
