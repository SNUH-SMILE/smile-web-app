import React, {useEffect} from 'react';
function InterviewList({interviewData, idx, type }) {

    const val =['val01','val02','val03','val04','val05','val06','val07','val08','val09','val10','val11','val12',];

    return (

        <div ket={idx} className="interview">
            <h2>{interviewData.interviewTitle}</h2>
            <table>
                <tbody>
                {Object.values(interviewData.interviewContents).filter(i=>i.interCategori.substring(0,1) == type).map((content, i) => (
                    <>
                        <tr style={{fontSize: "17px"}}>
                            <td>{content.interNo}.</td>
                            <td>{content.interContent}</td>
                        </tr>
                        <tr style={{fontSize: "13px"}}>{/*type에 따라 inputbox(13), radio(10), checkbox(11)로 표현*/}

                            { content.interType == '13'?
                                <td colSpan="2">
                                    <input type="text" className="form-control" defaultValue={content.answerValue || null} readOnly></input>

                                </td>
                                : content.interType =='10' ?
                                    <td colSpan="2">
                                        {val.map((name,idx) =>
                                            <> {content[name] &&
                                                <input className="form-check-input" type="radio" name={content.interseq} id={content.interseq} checked={content.answerValue == (idx)} readOnly></input>}
                                                {content[name] && <label className="form-check-label" htmlFor={content.interseq} readOnly>{content[name]}</label>}
                                            </>
                                        )}
                                    </td>
                                    :
                                    <td colSpan="2">
                                        {val.map((name,idx) =>
                                            <>
                                                {content[name] &&  <input type="checkbox" id={content.interseq+idx.toString()} checked={(content.answerValue.split(',').filter(i=>i == idx)>0)} className="form-check-input" readOnly/>}
                                                {content[name] &&   <label className="form-check-label" > {content[name]}</label> }
                                            </>
                                        )}
                                    </td>
                            }
                        </tr>
                    </>
                ))}
                </tbody>
            </table>
        </div>

    )
}

export default InterviewList;