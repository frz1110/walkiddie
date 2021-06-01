const OptionCard = ({ratio, amount, isDisabled}) => {
    return ( 
        <div className="px-2 py-1" data-testid="mi-opt-card">
            <label className={isDisabled ? "mi-card col p-3 mi-card-disabled" : "mi-card col p-3"}>
                <input type="radio" className="mi-option-radio" name="mi-amount" value={amount} data-testid="mi-radio-btn" disabled={isDisabled}/>
                <span className="mi-option-subtitle mi-option-info-margin mt-5">{ratio}% dari total pendanaan</span>
                <hr className="mi-option-divider mt-2 mb-4"/>
                <span className="mi-option-nominal mi-option-info-margin">Rp {amount.toLocaleString()}</span>
            </label>
        </div>
     );
}
 
export default OptionCard;