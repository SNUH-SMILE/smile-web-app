import React from "react";
import {CgChevronLeft, CgChevronRight} from "react-icons/cg";
import {useTable, useSortBy, usePagination} from "react-table";
import PropTypes from "prop-types";

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


function ReactTable({ tableHeader, tableBody, sorted, pagination, trOnclick }) {

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
            <table {...getTableProps()} className="table table-striped table-hover text-expert table-fixed" style={{height:"80%"}}>
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
                                <tr {...row.getRowProps()} onClick={()=>trOnclick(row.cells[0].value)}>
                                    {row.cells.map(cell => {
                                        return <td className={cell.column.styleClassName} {...cell.getCellProps()}>{cell.render('Cell')}</td>
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
ReactTable.defaultProps={
    tableBody:[],
    sorted:false,
    pagination:false,
}
ReactTable.propTypes = {
    tableHeader:PropTypes.array.isRequired,
    tableBody:PropTypes.array,
    sorted:PropTypes.bool,
    pagination:PropTypes.bool,
    trOnclick:PropTypes.func,
}
export default ReactTable;
