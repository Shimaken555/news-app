import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  SafeAreaView,
  RefreshControl,
} from 'react-native';
import ListItem from '../components/list-item';
import Constants from 'expo-constants';
import axios from 'axios';
import Loading from '../components/Loading';

const URL = `https://newsapi.org/v2/top-headlines?country=jp&apiKey=${Constants.manifest.extra.newsApiKey}`;

const styles = StyleSheet.create({
  container: {  
    flex: 1,
    backgroundColor: '#fff',
  },
  itemContainer: {
    height: 100,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    flexDirection: 'row',
  },
  leftContainer: {
    width: 100,
  },
  rightContainer: {
    flex: 1,
    flexDirection: 'column',
    padding: 10,
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 16,
  },
  subText: {
    fontSize: 12,
    color: 'gray',
  },
});

export const HomeScreen = ({ navigation }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  //refを初期化する
  const pageRef = useRef(1);
  
  const fetchedAllRef = useRef(false);
  //fetchArticlesに引数（ページ）を渡して、それを表示する。
  useEffect(() => {
    setLoading(true);
    fetchArticles();
    setLoading(false);
  }, []);

  const fetchArticles = async (page) => {
    setLoading(true);
    try {
      const response = await axios.get(`${URL}&page=${page}`);
      // APIの記事が空っぽだったら最後までいったと判定する
      if (response.data.articles.length > 0) {
        // setArticles(response.data.articles);
        // 前回のArticleを取得して、新しいデータをくっつける
        setArticles((prevArticles) => [
          ...prevArticles,
          ...response.data.articles,
        ]);
      } else {
        fetchedAllRef.current = true;
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const onEndReached = () => {
    // fetchedAllRefがtrueだったら最後までいったことになる
    if (!fetchedAllRef.current) {
      pageRef.current = pageRef.current + 1;
      fetchArticles(pageRef.current);
    }
  };

  const onRefresh = async () => {
    // 記事の再取得する処理といろいろと初期化する。
    setRefreshing(true);
    setArticles([]);
    pageRef.current = 1;
    fetchedAllRef.current = false;
    await fetchArticles(1);
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={articles} //FlatListで表示したいデータの配列を入れる
        renderItem={({ item }) => (
          <ListItem
            imageUrl={item.urlToImage}
            title={item.title}
            author={item.author}
            onPress={() => {
              navigation.navigate('Article', {
                // パラメーターの名前を指定する
                article: item,
              });
            }}
            //articlesの中のarticle達が上から順番に入ってくる。表示するrender関数を指定する。
            //map展開の要領で指定する。
          />
        )}
        //キーを指定する
        keyExtractor={(item, index) => index.toString()}
        onEndReached={onEndReached}
        //引っ張ったら更新するリフレッシュ
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      {/* trueのときだけ表示する */}
      {loading && <Loading />}
    </SafeAreaView>
  );
};
