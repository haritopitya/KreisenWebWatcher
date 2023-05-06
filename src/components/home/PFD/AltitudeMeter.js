import { css } from '@emotion/react';
import React from 'react';

const AltitudeMeter= ({ altitude }) => {
   const styles = {
      wrap: css({
         display: 'flex',
         position: 'absolute',
         right: 10,
         height: '80%',
         width: '15%',
         backgroundColor: 'rgba(0,0,0,0.1)',
         border: '1px solid white',
         alignItems: 'flex-end',
         overflow: 'hidden',
      }),
      inner: css({
         height: '450%',
         width: '100%',
         justifyContent: 'flex-end',
         paddingLeft: 0,
         transform: `translateY(${(1 + parseFloat(altitude))*100/18}%)`,
      }),
      img: css({
         height: '100%',
         maxWidth: '100%',
      }),
      box: css({
         position: 'absolute',
         backgroundColor: 'red',
         borderColor: 'white',
         borderWidth: 1,
         width: '16%',
         height:'20%',
         justifyContent: 'center',
         right: 8,
         flexDirection: 'row',
         alignItems: 'baseline',
      }),
      val: css({
         color: 'white',
         textAlign: 'right',
         fontWeight: 'bold',
         fontSize: 25,
      }),
      unit: css({
         color: 'white',
         textAlign: 'right',
         fontSize: 15,
      }),
   }
   return (
      <>
         <div css={styles.wrap}>
            <div css={styles.inner}>
               <img src='svg/altitudeTape.svg' css={styles.img} alt='altitude tape' />
            </div>
         </div>
      </>
   )
}

export default AltitudeMeter
