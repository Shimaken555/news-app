import React from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet, SafeAreaView, FlatList } from 'react-native';
import ListItem from '../components/list-item';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

const ClipScreen = ({ navigation }) => {
  // stateの中にあるuserを読み込む
  const user = useSelector((state) => state.user);
  // userの中にあるclipsの配列を展開していく。
  const { clips } = user;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        //今読み込んできたclipsを使う。HomeScreenではarticle
        data={clips}
        renderItem={({ item }) => (
          <ListItem
            imageUrl={item.urlToImage}
            title={item.title}
            author={item.author}
            onPress={() => navigation.navigate('Article', { article: item })}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
};

export default ClipScreen;
