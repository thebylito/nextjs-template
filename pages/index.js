import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Creators } from 'appStore/ducks/auth';
import { wrapper } from 'appStore/wrapper';

function Index() {
  const state = useSelector(state => state);
  const dispatch = useDispatch();
  // React.useEffect(() => {
  //   setTimeout(() => {
  //     dispatch(
  //       Creators.getSuccess({
  //         access_token: 'zxc',
  //         refresh_token: 'zxc',
  //       })
  //     );
  //   }, 3000);
  // }, []);

  return (
    <div className="index">
      <h1>HUE</h1>
      <h1>{state.auth.access_token}</h1>
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(({ store }) => {
  store.dispatch(
    Creators.getSuccess({
      access_token: 'asd',
      refresh_token: 'asd',
    })
  );
});

// Index.getInitialProps = async ({ store }) => {
//   await store.dispatch(
//     Creators.getSuccess({
//       access_token: '3333',
//       refresh_token: '333',
//     })
//   );
//   // if (req) {
//   //   // All async actions must be await'ed
//   //   );
//   //   // Some custom thing for this particular page
//   //   //return { pageProp: 'server' };
//   // }

//   return {};
// };

export default Index;
