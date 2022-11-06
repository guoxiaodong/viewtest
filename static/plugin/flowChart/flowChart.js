import $ from 'jquery'
import * as d3 from 'd3'
import { Graph } from 'graphlib'
import renderer from 'dagre-d3-renderer'

/**
*
* 作者：龙华
* pid：P0043702
* 联系方式：QQ345603828
* 功能：基于dagreD3封装流程图生成类
* 时间：2018年03月05日09:40:14
*/

export class FlowChart {
    constructor (config) {
        const now = $.now()
        this.g = null
        this.more = 'more'
        this.config = config
        this.config.tipClass = 'd3-tip'
        this.config.popupClass = 'd3-popup'
        this.config.tip = this.config.tipClass + now
        this.config.popup = this.config.popupClass + now
        this.data = null
        this.inited = false
    }
    select (select) {
        return d3.select(this.config.container + ' ' + select)
    }
    selectAll (selectAll) {
        return d3.selectAll(this.config.container + ' ' + selectAll)
    }
    resetSelect () {
        $(this.config.container + ' .node-dom .more.select').removeClass('select')
    }

    hidePopup () {
        if (this.d3popup) {
            this.d3popup.style.display = 'none'
            this.resetSelect()
        }
    }

    init () {
        $(this.config.container).html(`<svg width='${this.config.width}' height='${this.config.height}' ><g></g></svg>`)
        let svg = this.select('svg')
        let gdom = this.select('g')
        let zoom = d3.zoom().on('zoom', () => {
            gdom.attr('transform', d3.event.transform)
            this.hidePopup()
        })
        svg.on('drag', () => {
            this.hidePopup()
        })

        svg.call(zoom)
        this.inited = true
    }

    tip (obj) {
        let tr = []
        for (let key in obj) {
            tr.push(`<tr><td>${key}：</td><td>${obj[key]}</td></tr>`)
        }

        return `<table>${tr.join('')}</table>`
    }

    clear () {
        $('.' + this.config.tip).remove()
        $('.' + this.config.popup).remove()
        this.g = null
        this.inited = false
        $(this.config.container).html('')
    }

    /**
     * 弹窗使用绝对定位计算坐标，为了防止body滚动条影响弹窗位置，需要约束弹窗相对于某个父级容器定位
     *
     * @returns
     * @memberof FlowChart
     */
    parentOffset () {
        return $(this.config.d3Parent).offset()
    }

    event () {
        const body = document.querySelector(this.config.d3Parent)
        let d3Tip = document.querySelector('.' + this.config.tip)
        let d3popup = this.d3popup = document.querySelector('.' + this.config.popup)

        if (!d3Tip) {
            d3Tip = $(`<div class='${this.config.tipClass} ${this.config.tip}'></div>`)[0]
            body.append(d3Tip)
        }

        if (!d3popup) {
            const popupFlag = this.config.popup

            d3popup = this.d3popup = $(`<div class='${this.config.popupClass} ${popupFlag}'> <div class='header'>详细信息 <label class='del'>╳</label></div>
                                    <div class='content'>
                                        <table>
                                            <tr><td>表单编号：</td><td class='form-number'>12356818948</td></tr>
                                        </table>
                                </div></div>`)[0]

            body.append(d3popup)

            d3.select('.' + popupFlag + ' .del').on('click', (d, i, group) => {
                this.hidePopup()
            })
        }

        // node hover event
        const node = this.selectAll('.node')

        node.on('mousemove', (d, i, group) => {
            let node = this.data.nodes[i]

            if (node) {
                let pOffset = this.parentOffset()
                d3Tip.style.top = d3.event.clientY - pOffset.top + 10 + 'px'
                d3Tip.style.left = d3.event.clientX - pOffset.left + 10 + 'px'
                d3Tip.style.display = 'block'
                d3Tip.innerHTML = this.tip(node)
            } else {
                d3Tip.style.display = 'none'
            }
        }).on('mouseout', () => {
            d3Tip.style.display = 'none'
        })

        // more button event

        const more = this.selectAll('.' + this.more)

        more.on('mouseover mouseout mousemove', (d, i, group) => {
            d3Tip.style.display = 'none'
            d3.event.stopPropagation()
            d3.event.preventDefault()
            return false
        }).on('click', (d, i, group) => {
            const element = d3.event.target
            const target = $(element)
            const offset = target.offset()
            const boundingClientRect = element.getBoundingClientRect()
            const d3width = boundingClientRect.right - boundingClientRect.left
            const pOffset = this.parentOffset()
            const top = offset.top - pOffset.top - 1 + 'px'
            const left = offset.left - pOffset.left + d3width + 2 + 'px'
            const node = this.data.nodes[target.attr('index')]

            this.resetSelect()

            $(d3popup).css({
                top: top,
                left: left,
                display: 'block'
            }).find('.form-number').html(node.formNo)

            target.addClass('select')
        })
    }

    draw (data) {
        if (!this.inited) {
            this.init()
        }

        if (!this.g) {
            this.g = new Graph().setGraph({})
        }

        if (!data) {
            return
        }

        this.data = data
        const g = this.g

        // Automatically label each of the nodes
        data.nodes.forEach((node, i) => {
            let dom = ''
            let status = node.status

            if (status === 'activity') {
                dom = ` <div class='node-dom'>
                            <div class='header'>
                                <label class='title ellipsis'>${node.name}</label>
                                <a class='${this.more}' index='${i}' href='javascript:;'>▶</a>
                            </div>
                            <div class='result ellipsis'>
                            ${node.subLabel}
                            </div>
                        </div>  `
            } else if (status === 'start' || status === 'end') {
                dom = `<div class='node-dom end-to-end'>
                        ${node.name}
                    </div>  `
            }
            g.setNode(node.id, { labelType: 'html', label: dom, class: 'future ' + node.id, padding: 1 })
        })

        data.edges.forEach((edge) => {
            const obj = {
                source: edge.source,
                target: edge.target,
                label: {
                    labelType: 'html',
                    label: `<div class='action-label' title='${edge.action.label}'><span class='${edge.action.master ? 'master' : ''}'></span> ${edge.action.label}</div>`,
                    // style: 'stroke: #f77; stroke-width: 2px;' arrowheadStyle='fill: #f77',
                    arrowheadStyle: 'stroke: #397dab; stroke-width: 1px; fill: #397dab;'
                }
            }

            // if (edge.type == 'approve') {
            //     g.setEdge(edge.source, edge.target, {
            //         labelType: 'html', label: edge.label, style: {
            //             color: 'red'
            //         }
            //     });
            // }

            if (edge.type == 'reject') {
                obj.label.class = 'rejectEdgePath'
            }
            g.setEdge(obj.source, obj.target, obj.label)
        })

        // Create and configure the renderer
        this.select('g').call(renderer.render(), g)
        this.event()
    }

}
// 数据结构
// export let MockData = {
//     nodes: [
//         {
//             name: '1111',
//             id: '123',
//             role: '设fdasf管',
//             status: 'start'
//         },
//         {
//             name: '222',
//             subLabel: '新建',
//             id: '456',
//             role: '供应商',
//             status: 'activity',
//             formNo: 'ab8fb7c4'
//         }
//     ],
//     edges: [
//         {
//             source: '123',
//             target: '456',
//             action: {
//                 label: '提交',
//                 master: true
//             }
//         },
//         {
//             source: '456',
//             target: '123',
//             action: {
//                 label: '拒绝',
//                 master: false
//             }
//         }
//     ]
// }

