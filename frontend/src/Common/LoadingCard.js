import './LoadingCard.scss';

const LoadingCard = (props) => {
    return (
        <div className=''>
            {props.children}
        </div>
    );
}

export default LoadingCard;