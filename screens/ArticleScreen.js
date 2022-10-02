import React from 'react';
import { StyleSheet, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import { useDispatch, useSelector } from 'react-redux';
import { addClip, deleteClip } from '../store/actions/user';
import ClipButton from '../components/ClipButton';
import Loading from '../components/Loading';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export const ArticleScreen = ({ route }) => {
  const { article } = route.params;

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const { clips } = user;

  // 今開いているファイルがClipされているか判定する関数を書く
  const isClipped = () => {
    // 配列の中のある要素があるかどうか判定するときはsomeを使う
    return clips.some((clip) => clip.url === article.url);
  };

  const toggleClip = () => {
    if (isClipped()) {
      dispatch(deleteClip({ clip: article }));
    } else {
      dispatch(addClip({ clip: article }));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* いずれもPropsで渡してる */}
      <ClipButton onPress={toggleClip} enabled={isClipped()} />
      <WebView
        source={{uri: article.url}}
        startInLoadingState={true}
        renderLoading={() => {
          return <Loading />;
        }}
      />
    </SafeAreaView>
  );
};
