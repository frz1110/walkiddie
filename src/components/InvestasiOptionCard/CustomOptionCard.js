const CustomOptionCard = ({maxx}) => {
    return ( 
        <div className="px-2 py-1" data-testid="mi-custom-opt-card">
            <label className="mi-card col p-3">
                <input type="radio" className="mi-option-radio" name="mi-amount" value="custom" data-testid="mi-radio-btn"/>
                <span className="mi-option-subtitle mi-option-info-margin mt-5">Jumlah lain</span>
                <hr className="mi-option-divider mt-2 mb-4"/>
                <div className="flex mi-custom-container">
                    <span className="mi-option-nominal mi-option-info-margin">Rp </span>
                    <input type="number" min={10000} max={maxx} className="mi-custom-option" id="mi-custom-amount" data-testid="mi-custom-amount"/>
                </div>
            </label>
        </div>
     );
}
 
export default CustomOptionCard;