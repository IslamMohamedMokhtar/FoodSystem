function ErrorFallBackComponent({ error, resetError }) {
    return (
        <>
            <view>
                <text>Something happened!</text>
                <text>{error.toString()}</text>
                <button onPress={resetError} title={'Try again'} />
            </view>
        </>
    );
}

export default ErrorFallBackComponent;
