import React, {useEffect, useState} from "react";
import {CgChevronLeft, CgChevronRight} from "react-icons/cg";
import {BsX} from "react-icons/bs";
import {useTable, useSortBy, usePagination} from "react-table";
import PropTypes from "prop-types";
import commonCode from "../Apis/CommonCode";

/**
 * https://karthikraja555.medium.com/server-side-pagination-in-react-table-a4311b730d19
 *   const columns = [{Header:'1',accessor:'A'},{Header:'2',accessor:'B'}]
 *   return (
 *     <Styles>
 *       <ReactTable tableHeader={columns} />
 *     </Styles>
 *   )
 *   const Styles = styled.div`
 *   padding: 1rem;
 *
 *   table {
 *     border-spacing: 0;
 *     border: 1px solid black;
 *
 *     tr {
 *       :last-child {
 *         td {
 *           border-bottom: 0;
 *         }
 *       }
 *     }
 *
 *     th,
 *     td {
 *       margin: 0;
 *       padding: 0.5rem;
 *       border-bottom: 1px solid black;
 *       border-right: 1px solid black;
 *
 *       :last-child {
 *         border-right: 0;
 *       }
 *     }
 *   }
 * `
 */


function ReactTable({ customTableStyle='',tableHeader, tableBody, sorted, edited, pagination, trOnclick, deleteRow ,targetSelectData, primaryKey }) {
    // Table Header
    const columns = React.useMemo(() => tableHeader, [tableHeader])

    // Table Body
    const data = React.useMemo(() => tableBody, [tableBody])

    const {
        //공통
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,

        //Row
        rows,

        //Page
        page,
        canPreviousPage, // 이전페이지존재여부
        canNextPage,// 다음페이지존재여부
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,

        state: { pageIndex, pageSize },
    }
        = useTable({
        columns,
        data,
        initialState: {pageIndex : 1, pageSize : 2}
    },sorted && useSortBy,pagination && usePagination)


    return (
        <>
            <table {...getTableProps()} className={customTableStyle ? customTableStyle : "table table-striped table-hover text-expert table-fixed"} style={{height:"99%"}}>
                <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            // 정렬
                            <th className={column.styleClassName} {...column.getHeaderProps(sorted&&column.getSortByToggleProps())}>
                                {column.render('Header')}
                                {/* 정렬 UI */}
                                {sorted&&<span>
                                {column.isSorted
                                    ? column.isSortedDesc
                                        ? ' 🔽'
                                        : ' 🔼'
                                    : ' 🔽🔼'
                                }
                            </span>}
                            </th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                {

                    pagination ?
                        page.map((row, i) => {
                            prepareRow(row)
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map(cell => {
                                        return <td className={cell.column.styleClassName} {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                    })}
                                </tr>
                            )
                        })
                        :
                        rows.map((row, i) => {
                            prepareRow(row)
                            return (
                                edited ?
                                    row.original.header !== undefined && row.original.header.includes('C') ?
                                        primaryKey === 'comCd'?
                                        //    Comcd 신규 Row
                                        <tr key={Object(row.original)[primaryKey]} className={'checked-active'}>
                                            <td className="cd1">
                                                <button type="button" className="btn-delete" onClick={()=>deleteRow(row.original.header,primaryKey)}><BsX/>
                                                </button>
                                            </td>
                                            <td className="cd2">
                                                {/*<input type="text" className="form-control text-center"/>*/}
                                            </td>
                                            <td className="cd3">
                                                <input type="text"
                                                       className="form-control text-center"
                                                       autoFocus={true}
                                                       name={'comCdNm'}
                                                       onChange={(e)=> row.cells[2].column.changeFunc(e,'comCdNm',Object(row.original)[primaryKey],primaryKey)}
                                            />
                                            </td>
                                            <td className="cd4">
                                                <select className="form-select"
                                                        name={'comCdDiv'}
                                                        onChange={(e)=> row.cells[3].column.changeFunc(e,'comCdDiv',Object(row.original)[primaryKey],primaryKey)}
                                                >
                                                    <option value={''} >업무구분</option>
                                                    {targetSelectData && targetSelectData.map(value =>
                                                        <option value={value.detailCd}
                                                                key={value.detailCd}
                                                        >
                                                            {value.detailCdNm}
                                                        </option>
                                                    )}
                                                </select>
                                            </td>
                                            <td className="cd5">
                                                <input className="form-check-input use-check"
                                                       defaultChecked={true}
                                                       onChange={(e)=>
                                                           row.cells[4].column.changeFunc(e,'useYn',Object(row.original)[primaryKey],primaryKey)}
                                                       type="checkbox"/>
                                            </td>
                                            <td className="cd6">
                                                <input type="text" className="form-control"
                                                       onChange={(e)=>
                                                           row.cells[5].column.changeFunc(e,'remark',Object(row.original)[primaryKey],primaryKey)}
                                                />
                                            </td>
                                        </tr>
                                            :
                                            //    ComcdDetail 신규 Row
                                            <tr key={Object(row.original)['header']} className={'checked-active'}>
                                                <td className="cd1">
                                                    <button type="button" className="btn-delete" onClick={()=>deleteRow(row.original.header,primaryKey)}>
                                                        <BsX/>
                                                    </button>
                                                </td>
                                                <td className="cd2">
                                                    <input type="text"
                                                           className="form-control text-center"
                                                           autoFocus={true}
                                                           name={row.cells[1].column.id}
                                                           onChange={(e)=> row.cells[1].column.changeFunc(e,'detailCd',Object(row.original)[primaryKey],primaryKey,row.original.header)}
                                                    />
                                                </td>
                                                <td className="cd3">
                                                    <input type="text"
                                                           className="form-control text-center"
                                                           name={row.cells[2].column.id}
                                                           onChange={(e)=> row.cells[2].column.changeFunc(e,'detailCdNm',Object(row.original)[primaryKey],primaryKey,row.original.header)}
                                                    />
                                                </td>
                                                <td className="cd4">
                                                    <input type="checkbox"
                                                           defaultChecked={true}
                                                           className="form-check-input use-check"
                                                           onChange={(e)=> row.cells[3].column.changeFunc(e,'useYn',Object(row.original)[primaryKey],primaryKey,row.original.header)}
                                                    />
                                                </td>
                                                <td className="cd5">
                                                    <input type="text"
                                                           className="form-control text-center"
                                                           onChange={(e)=> row.cells[4].column.changeFunc(e,'property1',Object(row.original)[primaryKey],primaryKey,row.original.header)}
                                                    />
                                                </td>
                                                <td className="cd6">
                                                    <input
                                                        type="text"
                                                        className="form-control text-center"
                                                        onChange={(e)=> row.cells[5].column.changeFunc(e,'property2',Object(row.original)[primaryKey],primaryKey,row.original.header)}
                                                    />
                                                </td>
                                                <td className="cd7">
                                                    <input
                                                        type="text"
                                                        className="form-control text-center"
                                                        onChange={(e)=> row.cells[6].column.changeFunc(e,'property3',Object(row.original)[primaryKey],primaryKey,row.original.header)}
                                                    />
                                                </td>
                                                <td className="cd8">
                                                    <input
                                                        type="text"
                                                        className="form-control text-center"
                                                        onChange={(e)=> row.cells[7].column.changeFunc(e,'property4',Object(row.original)[primaryKey],primaryKey,row.original.header)}
                                                    />
                                                </td>
                                                <td className="cd9">
                                                    <input
                                                        type="text"
                                                        className="form-control text-center"
                                                        onChange={(e)=> row.cells[8].column.changeFunc(e,'property5',Object(row.original)[primaryKey],primaryKey,row.original.header)}
                                                    />
                                                </td>
                                                <td className="cd10">
                                                    <input type="text"
                                                           className="form-control"
                                                           onChange={(e)=> row.cells[9].column.changeFunc(e,'remark',Object(row.original)[primaryKey],primaryKey,row.original.header)}
                                                    />
                                                </td>
                                            </tr>
                                    :<tr {...row.getRowProps()} onClick={trOnclick ? ()=>trOnclick(Object(row.values)[primaryKey]) : null}>
                                        {row.cells.map(cell => {
                                            return (
                                                row.original.active ?
                                                    <td className={cell.column.styleClassName + ' checked-active'} {...cell.getCellProps()}>
                                                        {/* checkbox 일 때*/}
                                                        { cell.column.editElement==='checkBox' &&
                                                        <input className={"form-check-input checkbox-active "+cell.column.styleClassNameForBody}
                                                               type="checkbox"
                                                               name={cell.column.id}
                                                               defaultChecked={cell.value === 'Y' || row.original.active}
                                                               onClick={cell.column.clickFunc ?
                                                                   (e)=>cell.column.clickFunc(e,Object(row.original)[primaryKey],primaryKey)
                                                                   :null
                                                               }
                                                               onChange={cell.column.changeFunc ?
                                                                   (e) =>
                                                                       cell.column.changeFunc(e,cell.column.id,Object(row.original)[primaryKey],primaryKey)
                                                                   : null
                                                               }

                                                        />
                                                        }

                                                        {/* text 일 때*/}
                                                        { cell.column.editElement==='text' &&
                                                        <>
                                                            <div className={'checked-text ' + cell.column.styleClassNameForBody}>{cell.render('Cell')}</div>
                                                            <div className={'checked-contents '}>
                                                                <input type="text"
                                                                       className={'form-control ' + cell.column.styleClassNameForBody}
                                                                       name={cell.column.id}
                                                                       defaultValue={cell.value}
                                                                       onChange={(e)=>
                                                                           cell.column.changeFunc(e,cell.column.id,Object(row.original)[primaryKey],primaryKey)}
                                                                           // cell.column.changeFunc(e,cell.column.id,row.original.comCd,row.original.comCd)}
                                                                />
                                                            </div>
                                                        </>
                                                        }

                                                        {/* select 일 때*/}
                                                        { cell.column.editElement==='select' &&
                                                        <select className="form-select"
                                                                name={cell.column.id}
                                                                onChange={(e)=>
                                                                    cell.column.changeFunc(e,cell.column.id,Object(row.original)[primaryKey],primaryKey)}
                                                        >
                                                            <option value={''}>업무구분</option>
                                                            {targetSelectData && targetSelectData.map(value =>
                                                                <option value={value.detailCd}
                                                                        key={value.detailCd}
                                                                >
                                                                    {value.detailCdNm}
                                                                </option>
                                                            )}
                                                        </select>
                                                        }

                                                        { cell.column.editElement === undefined &&
                                                            <>{cell.render('Cell')}</>
                                                        }
                                                    </td>
                                                :<td className={cell.column.styleClassName} {...cell.getCellProps()}>
                                                    {/* checkbox 일 때*/}
                                                    { cell.column.editElement==='checkBox' &&
                                                        <input className={"form-check-input checkbox-active "+cell.column.styleClassNameForBody}
                                                               type="checkbox"
                                                               name={cell.column.id}
                                                               defaultChecked={cell.value === 'Y'}
                                                               onClick={cell.column.clickFunc ?
                                                                   (e)=>cell.column.clickFunc(e,Object(row.original)[primaryKey],primaryKey)
                                                                   :null
                                                               }
                                                               disabled={cell.column.styleClassNameForBody && true}
                                                        />
                                                    }

                                                    {/* text 일 때*/}
                                                    { cell.column.editElement==='text' &&
                                                        <>
                                                            <div className={'checked-text ' + cell.column.styleClassNameForBody}>{cell.render('Cell')}</div>
                                                            <div className={'checked-contents '}>
                                                                <input type="text"
                                                                       className={'form-control ' + cell.column.styleClassNameForBody}
                                                                       defaultValue={cell.value}
                                                                       name={cell.column.id}
                                                                       onChange={(e)=>
                                                                           cell.column.changeFunc(e,cell.column.id,Object(row.original)[primaryKey],primaryKey)}
                                                                />
                                                            </div>
                                                        </>
                                                    }

                                                    {/* select 일 때*/}
                                                    { cell.column.editElement==='select' &&
                                                    <select className="form-select" name={cell.column.id} value={cell.value } disabled>
                                                        <option value={''}>업무구분</option>
                                                        {targetSelectData && targetSelectData.map(value =>
                                                            <option value={value.detailCd}
                                                                    key={value.detailCd}
                                                            >
                                                                {value.detailCdNm}
                                                            </option>
                                                        )}
                                                     </select>
                                                     }
                                                     { cell.column.editElement === undefined &&
                                                        <>{cell.render('Cell')}</>
                                                     }
                                                </td>
                                            )
                                        })}
                                    </tr>
                                    :
                                    <tr {...row.getRowProps()} onClick={()=>trOnclick ? trOnclick(row.cells[0].value):null}>
                                        {row.cells.map(cell => {
                                            if(cell.column.Header === '선택'){
                                                if(cell.column.editElement === 'radio'){
                                                    return (
                                                        <td className={cell.column.styleClassName} {...cell.getCellProps()}>
                                                            <input
                                                                className="form-check-input"
                                                                type="radio"
                                                                name="lcenter"
                                                                onClick={(e) => {
                                                                    cell.column.editEvent(row.values, 'select');
                                                                }}
                                                            />
                                                        </td>
                                                    )
                                                }
                                                else{
                                                    return (
                                                        <td className={cell.column.styleClassName} {...cell.getCellProps()}>
                                                            <input
                                                                className="form-check-input"
                                                                type="checkbox"
                                                                onClick={(e)=>{
                                                                    e.target.checked
                                                                        ? cell.column.editEvent(row.values,'add')
                                                                        : cell.column.editEvent(row.values,'except')
                                                                }}
                                                            />
                                                        </td>
                                                    )
                                                }
                                            }
                                            else{
                                                if(cell.column.editElement === 'radio'){
                                                    return (
                                                        <td className={cell.column.styleClassName} {...cell.getCellProps()}>
                                                            <input
                                                                className="form-check-input"
                                                                name="userCenters"
                                                                type="radio"
                                                                defaultChecked={cell.value === 'Y'}
                                                                onChange={cell.column.editEvent
                                                                    ? ()=>{cell.column.editEvent(cell.row.values.centerId)}
                                                                    : null
                                                                }
                                                            />
                                                        </td>
                                                    )
                                                }
                                                else if(cell.column.editElement === 'checkbox'){
                                                    return (
                                                        <td className={cell.column.styleClassName} {...cell.getCellProps()}>
                                                            <input
                                                                className="form-check-input"
                                                                type="checkbox"
                                                                value={cell.row.values.delYn}
                                                                defaultChecked={cell.row.values.delYn}
                                                                onClick ={cell.column.editEvent
                                                                    ? ()=>{cell.column.editEvent(cell.row.values.centerId)}
                                                                    : null
                                                                }
                                                            />
                                                        </td>
                                                    )
                                                }
                                                else {
                                                    return <td className={cell.column.styleClassName} {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                                }
                                            }
                                        })}
                                    </tr>

                            )
                        })
                }
                </tbody>
            </table>
            {/*        Pagination*/}
            {pagination && <nav className="mt-4">
                <ul className="pagination">
                    <li className="page-item">
                        <a className="page-link" href="#" aria-label="Previous">
                            <span aria-hidden="true"><CgChevronLeft/></span>
                        </a>
                    </li>
                    <li className="page-item active" aria-current="page">
                        <a className="page-link" href="#">1</a>
                    </li>
                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                    <li className="page-item"><a className="page-link" href="#">4</a></li>
                    <li className="page-item"><a className="page-link" href="#">5</a></li>
                    <li className="page-item">
                        <a className="page-link" href="#" aria-label="Next">
                            <span aria-hidden="true"><CgChevronRight/></span>
                        </a>
                    </li>
                </ul>
            </nav>}

            {/*        Pagination*/}
        </>
    )
}

// customTableStyle=null,tableHeader, tableBody, sorted, edited, pagination, trOnclick, deleteRow ,targetSelectData, primaryKey
ReactTable.defaultProps={
    customTableStyle:'',
    tableBody:[],
    sorted:false,
    edited:false,
    pagination:false,
    trOnclick:null,
    deleteRow:null ,
    targetSelectData:null,
    primaryKey:''
}
ReactTable.propTypes = {
    tableHeader:PropTypes.array.isRequired,
    tableBody:PropTypes.array,
    sorted:PropTypes.bool,
    edited:PropTypes.bool,
    pagination:PropTypes.bool,
    trOnclick:PropTypes.func,
    deleteRow:PropTypes.func ,
    targetSelectData:PropTypes.array,
    primaryKey:PropTypes.string
}
export default ReactTable;
