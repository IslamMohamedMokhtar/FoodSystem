import './Loading.scss';

function Loading() {
    return (
        <>
            <div className='d-flex justify-content-center m-5'>
                <div className="three-body">
                    <div className="three-body__dot"></div>
                    <div className="three-body__dot"></div>
                    <div className="three-body__dot"></div>
                </div>
            </div>
        </>
    );
}

export default Loading;
