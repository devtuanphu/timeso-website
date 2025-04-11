import PropTypes from 'prop-types';
import { useWindowSize } from 'usehooks-ts';

const FlipCardItem = (props: any) => {
  const { width, height } = useWindowSize();
  const handleActiveCard = (index: number) => {
    document.querySelectorAll('.card.custom-card-flip').forEach((item, i) => {
      if (i == index) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  };
  return (
    <div className='card custom-card-flip' onClick={() => width < 768 && handleActiveCard(props.index)}>
      <div className='card-inner'>
        <div className={`card-front card-front-bg__${props.index}`}>
          <p className='card-front-title'>{props.data.title}</p>
        </div>
        <div className={`card-back card-back-bg__${props.index}`}>
          <p className='card-back-title'>{props.data.title}</p>
          <p className='card-back-content'>{props.data.content}</p>
        </div>
      </div>
    </div>
  );
};

FlipCardItem.propTypes = {
  index: PropTypes.number,
  data: PropTypes.object,
};

export { FlipCardItem };
