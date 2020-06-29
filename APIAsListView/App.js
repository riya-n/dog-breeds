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
  SectionList,
  ActivityIndicator,
  Image,
} from 'react-native';

const App: () => React$Node = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [url, setUrl] = useState(
    'https://images.dog.ceo/breeds/retriever-golden/n02099601_5051.jpg',
  );
  const [dogName, setDogName] = useState('Retriever');

  useEffect(() => {
    fetch('https://dog.ceo/api/breeds/list/all')
      .then(response => response.json())
      .then(json => {
        let dogs = [];
        let currDogs = [];
        let curr = 'A';
        Object.keys(json.message).forEach(breed => {
          const name = breed.charAt(0).toUpperCase() + breed.slice(1);
          if (name.charAt(0) === curr) {
            const breedData = {
              key: breed,
              name: name,
              types: json.message[breed],
            };
            currDogs.push(breedData);
          } else {
            const section = {
              heading: curr,
              data: currDogs,
            };
            dogs.push(section);
            curr = name.charAt(0);
            currDogs = [];
            const breedData = {
              key: breed,
              name: name,
              types: json.message[breed],
            };
            currDogs.push(breedData);
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

  function fetchDogImage(breed, name) {
    fetch('https://dog.ceo/api/breed/' + breed + '/images/random')
      .then(response => response.json())
      .then(json => {
        console.log('imageurl', json.message);
        setUrl(json.message);
        setDogName(name);
      })
      .catch(error => {
        console.error(error);
      });
  }

  return (
    <>
      <SafeAreaView>
        <Text style={styles.title}>Random {dogName} Dog Image</Text>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{uri: url}} />
        </View>
        <Text style={styles.title}>List of Dog Breeds</Text>
        <Text style={styles.subtitle}>
          Choose from the list below to change the image.
        </Text>
        <View style={styles.listContainer}>
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <SectionList
              sections={data}
              renderItem={({item}, i) => (
                <View
                  id={i}
                  style={styles.container}
                  onStartShouldSetResponder={() =>
                    fetchDogImage(item.key, item.name)
                  }>
                  <Text style={styles.name}>{item.name}</Text>
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
    paddingTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    textAlign: 'center',
    paddingTop: 5,
    fontSize: 14,
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
  imageContainer: {
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    padding: 10,
    paddingTop: 20,
    flexDirection: 'row',
    height: 400, // TODO: make this dynamic (for different screen sizes)
  },
  image: {
    width: 300,
    height: 300, // TODO: make this dynamic (for different screen sizes)
  },
});

export default App;
