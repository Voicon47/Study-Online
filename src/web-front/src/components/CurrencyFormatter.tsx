const CurrencyFormatter = ({ amount }: { amount: number }) => {
    const formattedAmount = amount.toLocaleString('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    return <span className="text-green-950 font-extrabold">{formattedAmount}</span>;
};

export default CurrencyFormatter;
