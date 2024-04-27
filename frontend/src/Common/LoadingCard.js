import './LoadingCard.scss';

const LoadingCard = (props) => {
    return (
        <div className='py-4'>
            {props.children}
        </div>
    );
}

export default LoadingCard;