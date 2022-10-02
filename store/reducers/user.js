// 初期値として空の配列を用紙する。まだ何もクリップしてない状態。
const initialState = {
  clips: [],
};

// 前回のstateをactionを受け取る
const userReducer = (state = initialState, action) => {
  // javascriptのswitchーcase構文
  switch (action.type) {
    // 前回のstateに今回のクリップを追加する
    case 'ADD_CLIP':
      return {
        // 前回のstateを展開する
        ...state,
        // お尻に新しいclipを追加する。
        clips: [...state.clips, action.clip],
      };
    case 'DELETE_CLIP':
      return {
        // 前回のstateを展開する
        ...state,
        // 渡ってきたclipのURLを一致しないclipの配列を返すことで新たな（対象clipを削除した）配列を生成する。
        clips: state.clips.filter((clip) => clip.url !== action.clip.url),
      };
    default:
      return state;
  }
};

export default userReducer;
