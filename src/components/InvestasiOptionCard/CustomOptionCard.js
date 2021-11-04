import { useState } from "react";

const CustomOptionCard = ({totalBiaya}) => {
    const [lot, setLot] = useState(1);
    const setLotState = (jmlLot)=>{
        if(jmlLot>100){
            setLot(100)
        }else if(jmlLot<1){
            setLot(1)
        }else if(jmlLot<=100 & jmlLot>=1){
            setLot(jmlLot)
        }else {
            setLot('')
        }
    }
    return ( 
        <div className="px-2 py-1" data-testid="mi-custom-opt-card">
            <label className="mi-card col p-3">
                <input type="radio" className="mi-option-radio" name="mi-amount" value="custom" data-testid="mi-radio-btn"/>
                <span className="mi-option-subtitle mi-option-info-margin mt-5">Jumlah Lot (minimal 1)</span>
                <hr className="mi-option-divider mt-2 mb-4"/>
                <div className="flex mi-custom-container">
                    <span className="mi-option-nominal mi-option-info-margin"></span>
                    <input type="number" value={lot} onChange={e=>setLotState(parseInt(e.target.value))} className="mi-custom-option" id="mi-custom-amount" data-testid="mi-custom-amount"/>
                </div>
            </label>
            <div className="row row-cols-1">
                    <h5>Total biaya: {totalBiaya*lot/100} </h5>
            </div>
        </div>
     );
}
 
export default CustomOptionCard;