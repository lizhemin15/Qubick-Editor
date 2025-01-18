const defaultBgUrl = 'https://cn.bing.com/th?id=OHR.GeckoLeaf_ZH-CN9908456174_1920x1080.jpg';

// 添加参数类型和图标的映射
const PARAM_TYPE_ICONS = {
    string: 'fa-font',
    number: 'fa-hashtag',
    boolean: 'fa-toggle-on',
    array: 'fa-list',
    object: 'fa-cube',
    default: 'fa-code' // 默认图标
};

document.querySelectorAll('.module-list').forEach(moduleList => {
    Sortable.create(moduleList, {
        group: {
            name: 'shared',
            pull: 'clone',
            put: false,
        },
        sort: false,
        animation: 150
    });

    // 筛选功能
    const filterInput = moduleList.querySelector('.module-filter');
    const moduleItems = Array.from(moduleList.querySelectorAll('.module-item'));

    // 为左侧模块项绑定双击事件
    const parentSection = moduleList.closest('.bottom-section');
    if (parentSection && ['2', '3', '4'].includes(parentSection.getAttribute('data-section'))) {
        moduleItems.forEach(item => {
            item.addEventListener('dblclick', () => {
                const moduleName = item.textContent.trim();
                const editorContainer = document.querySelector('.editor-container');
                const existingTabContent = editorContainer.querySelector(`#content-${moduleName}`);
                const tabBar = document.querySelector('.tab-bar');

                if (existingTabContent) {
                    // 如果已存在同名tab，切换到该tab
                    const allTabContents = editorContainer.querySelectorAll('.tab-content');
                    allTabContents.forEach(tabContent => {
                        tabContent.classList.remove('active');
                    });
                    existingTabContent.classList.add('active');

                    // 同时切换对应的tab按钮
                    const allTabs = tabBar.querySelectorAll('.tab');
                    allTabs.forEach(tab => {
                        tab.classList.remove('active');
                    });
                    const existingTab = tabBar.querySelector(`[data-content="${moduleName}"]`);
                    if (existingTab) {
                        existingTab.classList.add('active');
                    }
                } else {
                    // 隐藏初始HTML中的元素
                    const initialTopBar = document.querySelector('.editor-container > .top-bar');
                    const initialContent = document.querySelector('.editor-container > .tab-content');
                    const initialRightSidebar = document.querySelector('.right-sidebar-container');
                    
                    if (initialTopBar) initialTopBar.style.display = 'none';
                    if (initialContent) initialContent.classList.remove('active');
                    if (initialRightSidebar) initialRightSidebar.style.display = 'none';

                    // 创建新的tab内容
                    const newTabContent = document.createElement('div');
                    newTabContent.className = 'tab-content';
                    newTabContent.id = `content-${moduleName}`;
                    
                    // 创建完整的内容结构
                    newTabContent.innerHTML = `
                        <div class="content-wrapper">
                            <div class="editor-container">
                                <div class="top-bar" style="display: flex;">
                                    <label for="step" style="margin-right: 10px;">步骤:</label>
                                    <input id="filter-step-${moduleName}" 
                                           type="text" 
                                           placeholder="" 
                                           style="width: 80%; padding: 8px; border-radius: 6px; border: 1px solid rgba(255, 255, 255, 0.2); background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(8px);">
                                    <button data-modules="section1" aria-label="执行动作" title="">
                                        <i class="fas fa-play"></i>
                                        <span>执行动作</span>
                                    </button>
                                    <button data-modules="section2" aria-label="上一步" title="">
                                        <i class="fas fa-undo"></i>
                                        <span>上一步</span>
                                    </button>
                                    <button data-modules="section3" aria-label="下一步" title="">
                                        <i class="fas fa-redo"></i>
                                        <span>下一步</span>
                                    </button>
                                    <button data-modules="section4" aria-label="保存版本" title="">
                                        <i class="fas fa-save"></i>
                                        <span>保存版本</span>
                                    </button>
                                    <button data-modules="section5" aria-label="历史版本" title="">
                                        <i class="fas fa-history"></i>
                                        <span>历史版本</span>
                                    </button>
                                </div>
                                <div class="editor" id="${moduleName}"></div>
                            </div>
                            <div class="right-sidebar-container" style="display: flex;">
                                <div class="right-sidebar">
                                    <div class="parameter-actions">
                                        <button id="add-btn-${moduleName}" aria-label="添加" title="">
                                            <i class="fas fa-plus"></i>
                                            <span>添加</span>
                                        </button>
                                        <div class="dropdown-button">
                                            <button id="sort-btn-${moduleName}" aria-label="排序" title="">
                                                <i class="fas fa-sort"></i>
                                                <span>排序</span>
                                            </button>
                                            <div class="dropdown" id="sort-dropdown-${moduleName}">
                                                <div class="dropdown-item" data-sort="name">名称</div>
                                                <div class="dropdown-item" data-sort="type">类型</div>
                                                <div class="dropdown-item" data-sort="tag-name">标签</div>
                                            </div>
                                        </div>
                                        <button id="filter-btn-${moduleName}" aria-label="筛选" title="">
                                            <i class="fas fa-filter"></i>
                                            <span>筛选</span>
                                        </button>
                                        <button id="delete-btn-${moduleName}" aria-label="删除" title="">
                                            <i class="fas fa-trash-alt"></i>
                                            <span>删除</span>
                                        </button>
                                    </div>
                                    <input type="text" 
                                           id="filter-input-${moduleName}" 
                                           class="filter-input glass-effect" 
                                           placeholder="输入筛选内容..."
                                           style="display: none; width: 100%; padding: 8px; margin-bottom: 10px; border-radius: 6px; border: 1px solid rgba(255, 255, 255, 0.2); background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(8px);">
                                    <div class="parameter-list" id="parameter-list-${moduleName}" style="min-height: 200px; border: 1px dashed rgba(255, 255, 255, 0.2); background: rgba(255, 255, 255, 0.05);">
                                        <!-- 清空初始内容 -->
                                    </div>
                                    
                                    <!-- 添加新的输入框部分 -->
                                    <div class="input-section" style="margin-top: 20px; padding: 15px; background: rgba(255, 255, 255, 0.1); border-radius: 8px;">
                                        <div class="section-title" style="font-size: 14px; font-weight: 500; margin-bottom: 15px; color: #333;">子程序信息</div>
                                        <div class="input-group" style="margin-bottom: 15px;">
                                            <label for="subprogram-name-${moduleName}" style="display: block; margin-bottom: 8px; color: #666;">子程序名称</label>
                                            <input type="text" 
                                                   id="subprogram-name-${moduleName}" 
                                                   class="form-input glass-effect" 
                                                   placeholder="请输入子程序名称"
                                                   style="width: 100%; padding: 8px; border-radius: 6px; border: 1px solid rgba(255, 255, 255, 0.2); background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(8px);">
                                        </div>
                                        <div class="input-group" style="margin-bottom: 15px;">
                                            <label for="subprogram-desc-${moduleName}" style="display: block; margin-bottom: 8px; color: #666;">说明</label>
                                            <textarea id="subprogram-desc-${moduleName}" 
                                                      class="form-input glass-effect" 
                                                      placeholder="请输入说明"
                                                      style="width: 100%; height: 100px; padding: 8px; border-radius: 6px; border: 1px solid rgba(255, 255, 255, 0.2); background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(8px); resize: vertical;"></textarea>
                                        </div>
                                        <div class="input-group" style="margin-bottom: 15px;">
                                            <label for="step-summary-${moduleName}" style="display: block; margin-bottom: 8px; color: #666;">步骤摘要</label>
                                            <input type="text" 
                                                   id="step-summary-${moduleName}" 
                                                   class="form-input glass-effect" 
                                                   placeholder="请输入步骤摘要"
                                                   style="width: 100%; padding: 8px; border-radius: 6px; border: 1px solid rgba(255, 255, 255, 0.2); background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(8px);">
                                        </div>
                                    </div>

                                    <!-- 添加底部按钮 -->
                                    <div style="margin-top: 20px; text-align: right; padding: 15px; border-top: 1px solid rgba(255, 255, 255, 0.2);">
                                        <button id="confirm-btn-${moduleName}" 
                                                style="padding: 8px 16px; background-color: #1a73e8; color: white; border: none; border-radius: 4px; margin-right: 10px; backdrop-filter: blur(8px);">
                                            保存
                                        </button>
                                        <button id="cancel-btn-${moduleName}" 
                                                style="padding: 8px 16px; background-color: #1a73e8; color: white; border: none; border-radius: 4px; backdrop-filter: blur(8px);">
                                            取消
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                    
                    editorContainer.appendChild(newTabContent);

                    // 为新创建的编辑器绑定Sortable功能
                    Sortable.create(newTabContent.querySelector('.editor'), {
                        group: {
                            name: 'shared'
                        },
                        animation: 150,
                        onAdd: function(evt) {
                            const item = evt.item;
                            const newItem = item.cloneNode(true);
                            
                            // 添加按钮容器
                            const actionButtons = document.createElement('div');
                            actionButtons.className = 'module-action-buttons';
                            actionButtons.style.cssText = `
                                position: absolute;
                                right: 8px;
                                top: 50%;
                                transform: translateY(-50%);
                                display: none;
                                gap: 4px;
                                background: rgba(255, 255, 255, 0.1);
                                padding: 4px;
                                border-radius: 4px;
                                backdrop-filter: blur(8px);
                            `;

                            // 添加编辑按钮
                            const editButton = document.createElement('button');
                            editButton.className = 'module-edit-btn';
                            editButton.innerHTML = '<i class="fas fa-edit"></i>';
                            editButton.style.cssText = `
                                border: none;
                                background: transparent;
                                color: #1a73e8;
                                cursor: pointer;
                                padding: 4px;
                                border-radius: 4px;
                                transition: background-color 0.2s;
                            `;
                            editButton.addEventListener('mouseover', () => {
                                editButton.style.backgroundColor = 'rgba(26, 115, 232, 0.1)';
                            });
                            editButton.addEventListener('mouseout', () => {
                                editButton.style.backgroundColor = 'transparent';
                            });

                            // 添加删除按钮
                            const deleteButton = document.createElement('button');
                            deleteButton.className = 'module-delete-btn';
                            deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
                            deleteButton.style.cssText = `
                                border: none;
                                background: transparent;
                                color: #dc3545;
                                cursor: pointer;
                                padding: 4px;
                                border-radius: 4px;
                                transition: background-color 0.2s;
                            `;
                            deleteButton.addEventListener('mouseover', () => {
                                deleteButton.style.backgroundColor = 'rgba(220, 53, 69, 0.1)';
                            });
                            deleteButton.addEventListener('mouseout', () => {
                                deleteButton.style.backgroundColor = 'transparent';
                            });

                            // 添加按钮到容器
                            actionButtons.appendChild(editButton);
                            actionButtons.appendChild(deleteButton);

                            // 设置新项的样式和结构
                            newItem.style.position = 'relative';
                            newItem.appendChild(actionButtons);

                            // 添加鼠标悬停事件
                            newItem.addEventListener('mouseenter', () => {
                                actionButtons.style.display = 'flex';
                            });
                            newItem.addEventListener('mouseleave', () => {
                                actionButtons.style.display = 'none';
                            });

                            // 绑定双击和编辑按钮事件
                            const handleEdit = () => {
                                const moduleName = newItem.textContent.trim();
                                showEditModal(moduleName, newItem);
                            };

                            newItem.addEventListener('dblclick', handleEdit);
                            editButton.addEventListener('click', handleEdit);

                            // 修改删除按钮点击事件处理
                            deleteButton.addEventListener('click', () => {
                                // 创建磨砂风格的确认对话框
                                const confirmDialog = document.createElement('div');
                                confirmDialog.className = 'confirm-dialog glass-effect';
                                confirmDialog.style.cssText = `
                                    position: fixed;
                                    top: 0;
                                    left: 0;
                                    right: 0;
                                    bottom: 0;
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    background: rgba(0, 0, 0, 0.5);
                                    z-index: 1000;
                                `;

                                const dialogContent = document.createElement('div');
                                dialogContent.className = 'dialog-content glass-effect';
                                dialogContent.style.cssText = `
                                    width: 300px;
                                    padding: 20px;
                                    border-radius: 12px;
                                    background: rgba(255, 255, 255, 0.2);
                                    backdrop-filter: blur(8px);
                                    border: 1px solid rgba(255, 255, 255, 0.3);
                                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                                `;

                                dialogContent.innerHTML = `
                                    <div style="margin-bottom: 20px; color: #000; font-size: 16px; font-weight: 600;">
                                        确定要删除这个模块吗？
                                    </div>
                                    <div style="text-align: right;">
                                        <button class="confirm-yes" 
                                                style="padding: 8px 16px; background: rgba(255, 255, 255, 0.15); color: #000; border: 1px solid rgba(0, 0, 0, 0.1); border-radius: 4px; margin-right: 10px; backdrop-filter: blur(8px); font-weight: 600;">
                                            删除
                                        </button>
                                        <button class="confirm-no" 
                                                style="padding: 8px 16px; background: rgba(255, 255, 255, 0.15); color: #000; border: 1px solid rgba(0, 0, 0, 0.1); border-radius: 4px; backdrop-filter: blur(8px); font-weight: 600;">
                                            取消
                                        </button>
                                    </div>
                                `;

                                confirmDialog.appendChild(dialogContent);
                                document.body.appendChild(confirmDialog);

                                // 绑定确认对话框按钮事件
                                const closeDialog = () => {
                                    document.body.removeChild(confirmDialog);
                                };

                                // 确认按钮
                                dialogContent.querySelector('.confirm-yes').addEventListener('click', () => {
                                    newItem.remove();
                                    closeDialog();
                                });

                                // 取消按钮
                                dialogContent.querySelector('.confirm-no').addEventListener('click', closeDialog);

                                // 点击对话框外部关闭
                                confirmDialog.addEventListener('click', (e) => {
                                    if (e.target === confirmDialog) {
                                        closeDialog();
                                    }
                                });
                            });

                            // 替换原始项
                            item.parentNode.replaceChild(newItem, item);
                        }
                    });

                    // 为新tab的参数列表绑定事件
                    initializeParameterList(moduleName);

                    // 创建新的tab按钮
                    const newTab = document.createElement('div');
                    newTab.className = 'tab';
                    newTab.setAttribute('data-content', moduleName);
                    newTab.innerHTML = `${moduleName}<span class="close-icon"><i class="fas fa-times"></i></span>`;
                    tabBar.appendChild(newTab);

                    // 切换到新创建的tab
                    const allTabContents = editorContainer.querySelectorAll('.tab-content');
                    allTabContents.forEach(tabContent => {
                        tabContent.classList.remove('active');
                    });
                    newTabContent.classList.add('active');

                    const allTabs = tabBar.querySelectorAll('.tab');
                    allTabs.forEach(tab => {
                        tab.classList.remove('active');
                    });
                    newTab.classList.add('active');
                    
                    // 绑定切换和关闭逻辑
                    initializeTabs('.tab', '.tab-content');
                }
            });
        });
    }

    // 处理输入框实时筛选
    filterInput.addEventListener('input', () => {
        const filterValue = filterInput.value.toLowerCase(); // 获取输入的值并转换为小写
        moduleItems.forEach(item => {
            const text = item.textContent.toLowerCase();
            if (text.includes(filterValue)) {
                item.style.display = 'flex'; // 显示符合条件的项
            } else {
                item.style.display = 'none'; // 隐藏不符合条件的项
            }
        });
    });
});

// Editor筛选
document.addEventListener('DOMContentLoaded', function() {
    const filterInput = document.getElementById('filter-step');
    const editor = document.getElementById('editor');

    // 默认背景颜色
    const defaultBackgroundColor = ''; // 也可以设置为你希望的默认颜色，例如 'white'

    // 筛选函数
    function filterModules() {
        const filterValue = filterInput.value.toLowerCase(); // 获取输入框的值并转为小写
        const modules = editor.getElementsByClassName('module-item'); // 获取所有class为module-item的div

        // 检查输入框是否为空
        if (filterValue === '') {
            // 如果为空，则恢复所有模块的背景颜色为默认
            for (let i = 0; i < modules.length; i++) {
                modules[i].style.backgroundColor = defaultBackgroundColor; // 恢复为默认背景颜色
            }
            return; // 结束函数
        }

        // 遍历所有module-item div
        for (let i = 0; i < modules.length; i++) {
            const moduleText = modules[i].textContent.toLowerCase(); // 获取div的文本内容并转为小写

            // 根据输入值进行模糊匹配
            if (moduleText.includes(filterValue)) {
                modules[i].style.backgroundColor = 'rgb(255, 230, 230)'; // 设置背景颜色为指定的RGB值
            } else {
                modules[i].style.backgroundColor = defaultBackgroundColor; // 恢复为默认背景颜色
            }
        }
    }

    // 监听输入框的输入事件
    filterInput.addEventListener('input', filterModules);

    // 使用MutationObserver观察editor变化
    const observer = new MutationObserver(filterModules);
    
    // 配置观察者：观察子节点变化
    observer.observe(editor, { childList: true, subtree: true });

    // 初始调用以确保初始状态是正确的
    filterModules();
});

// Sortable for editor (main content)
// 获取所有的编辑器元素
const editors = document.querySelectorAll('.editor');

// 对每个编辑器元素进行绑定
editors.forEach(editor => {
    Sortable.create(editor, {
        group: {
            name: 'shared'
        },
        animation: 150,
        onAdd: function(evt) {
            const item = evt.item;
            // 移除所有现有的事件监听器
            const newItem = item.cloneNode(true);
            item.parentNode.replaceChild(newItem, item);
            
            // 绑定新的双击事件（显示编辑表单）
            newItem.addEventListener('dblclick', () => {
                const moduleName = newItem.textContent.trim();
                
                // 创建模态框容器
                const modalContainer = document.createElement('div');
                modalContainer.className = 'modal-container glass-effect';
                modalContainer.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: rgba(0, 0, 0, 0.5);
                    z-index: 1000;
                `;

                // 创建表单内容
                const formContent = document.createElement('div');
                formContent.className = 'modal-content glass-effect';
                formContent.style.cssText = `
                    width: 400px;
                    padding: 20px;
                    border-radius: 12px;
                    background: rgba(255, 255, 255, 0.9);
                    backdrop-filter: blur(8px);
                `;

                formContent.innerHTML = `
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                        <h3 style="margin: 0; font-size: 16px; color: #333;">编辑模块: ${moduleName}</h3>
                        <button class="close-btn" style="background: none; border: none; cursor: pointer;">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="input-group">
                        <div class="section-title">名称</div>
                        <input type="text" id="module-name" value="${moduleName}" style="width: 100%; margin-bottom: 15px;">
                    </div>
                    <div class="input-group">
                        <div class="section-title">描述</div>
                        <textarea id="module-description" style="width: 100%; height: 100px; margin-bottom: 15px;"></textarea>
                    </div>
                    <div class="input-group">
                        <div class="section-title">参数设置</div>
                        <div style="margin-bottom: 15px;">
                            <input type="checkbox" id="param1">
                            <label for="param1">启用参数1</label>
                        </div>
                        <div style="margin-bottom: 15px;">
                            <input type="checkbox" id="param2">
                            <label for="param2">启用参数2</label>
                        </div>
                    </div>
                    <div style="text-align: right; margin-top: 20px;">
                        <button class="save-btn" style="padding: 8px 16px; background-color: #1a73e8; color: white; border: none; border-radius: 4px; margin-right: 10px;">保存</button>
                        <button class="cancel-btn" style="padding: 8px 16px; background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 4px;">取消</button>
                    </div>
                `;

                modalContainer.appendChild(formContent);
                document.body.appendChild(modalContainer);

                // 绑定关闭事件
                const closeModal = () => {
                    document.body.removeChild(modalContainer);
                };

                modalContainer.querySelector('.close-btn').addEventListener('click', closeModal);
                modalContainer.querySelector('.cancel-btn').addEventListener('click', closeModal);
                modalContainer.querySelector('.save-btn').addEventListener('click', () => {
                    // 这里添加保存逻辑
                    const newName = document.getElementById('module-name').value;
                    const description = document.getElementById('module-description').value;
                    // 可以在这里处理表单数据
                    console.log('保存模块设置:', { newName, description });
                    closeModal();
                });

                // 点击模态框外部关闭
                modalContainer.addEventListener('click', (e) => {
                    if (e.target === modalContainer) {
                        closeModal();
                    }
                });
            });
        }
    });
});

// 辅助函数：绑定双击事件到模块项
function bindDblClickToItem(item) {
    item.addEventListener('dblclick', () => {
        const moduleName = item.textContent.trim();
        const editorContainer = document.querySelector('.editor-container');
        const existingTabContent = editorContainer.querySelector(`#content-${moduleName}`);
        const tabBar = document.querySelector('.tab-bar');

        // ... (与上面相同的双击事件处理逻辑)
    });
}

const parameterList = document.getElementById('parameter-list');
const addButton = document.getElementById('add-btn');
const deleteButton = document.getElementById('delete-btn');

let lastSelectedIndex = -1;

// 为parameter-list中的每个元素添加点击事件
parameterList.querySelectorAll('div').forEach((item, index) => {
    item.addEventListener('click', (event) => {
        if (event.ctrlKey) {
            // 按住Ctrl键进行多选
            item.classList.toggle('selected');
        } else if (event.shiftKey) {
            // 按住Shift键进行范围选择
            const currentIndex = index;
            const startIndex = lastSelectedIndex === -1 ? currentIndex : lastSelectedIndex;
            const endIndex = currentIndex;

            const range = [startIndex, endIndex].sort((a, b) => a - b);
            parameterList.querySelectorAll('div').forEach((el, i) => {
                if (i >= range[0] && i <= range[1]) {
                    el.classList.add('selected');
                } else {
                    el.classList.remove('selected');
                }
            });
        } else {
            // 清除之前的选中状态
            parameterList.querySelectorAll('div').forEach(el => el.classList.remove('selected'));
            // 选中当前元素
            item.classList.add('selected');
        }

        lastSelectedIndex = index; // 更新最后一次选中的索引
    });
});

// 添加按钮的点击事件
addButton.addEventListener('click', () => {
    const newItem = document.createElement('div');
    newItem.textContent = '新参数 ' + (parameterList.children.length + 1);
    parameterList.appendChild(newItem);

    // 为新元素添加点击事件
    newItem.addEventListener('click', (event) => {
        if (event.ctrlKey) {
            newItem.classList.toggle('selected');
        } else if (event.shiftKey) {
            const currentIndex = parameterList.children.length - 1;
            const startIndex = lastSelectedIndex === -1 ? currentIndex : lastSelectedIndex;
            const endIndex = currentIndex;

            const range = [startIndex, endIndex].sort((a, b) => a - b);
            parameterList.querySelectorAll('div').forEach((el, i) => {
                if (i >= range[0] && i <= range[1]) {
                    el.classList.add('selected');
                } else {
                    el.classList.remove('selected');
                }
            });
        } else {
            parameterList.querySelectorAll('div').forEach(el => el.classList.remove('selected'));
            newItem.classList.add('selected');
        }

        lastSelectedIndex = parameterList.children.length - 1; // 更新最后一次选中的索引
    });
});

// 删除按钮的点击事件
deleteButton.addEventListener('click', () => {
    const selectedItems = parameterList.querySelectorAll('div.selected');
    selectedItems.forEach(selectedItem => {
        parameterList.removeChild(selectedItem);
    });
    lastSelectedIndex = -1; // 清空选中索引
});

function bindTabEvents() {
    const tabSections = document.querySelectorAll('.top-tab');
    const bottomSections = document.querySelectorAll('.bottom-section');

    tabSections.forEach(tab => {
        tab.addEventListener('click', () => {
            // 清除所有tab的active状态
            tabSections.forEach(t => t.classList.remove('active'));
            
            // 激活当前tab
            tab.classList.add('active');
            
            const sectionId = tab.getAttribute('data-section');

            // 隐藏所有bottom-section
            bottomSections.forEach(section => section.style.display = 'none');
            
            // 显示对应的bottom-section
            const activeSection = document.querySelector(`.bottom-section[data-section="${sectionId}"]`);
            if(activeSection) {
                activeSection.style.display = 'flex'; // 显示对应的section
            }
        });
    });
}

// 初次绑定事件
bindTabEvents();

// Button sidebar click event
const buttons = document.querySelectorAll('.button-sidebar button');
buttons.forEach(button => {
    button.addEventListener('click', () => {
        // 清除所有按钮的 active 状态
        buttons.forEach(btn => btn.classList.remove('active'));
        
        // 激活当前按钮
        button.classList.add('active');
        
        // 获取要显示的模块列表
        const modulesToShow = button.getAttribute('data-modules');
        
        // 根据选择的按钮更新模块列表
        updateModuleList(modulesToShow);
    });
});

// 更新模块列表的函数
function updateModuleList(modules) {
    const moduleLists = document.querySelectorAll('.module-list');
    moduleLists.forEach(list => {
        if (list.classList.contains(modules)) {
            list.style.display = 'block'; // 显示对应模块列表
        } else {
            list.style.display = 'none'; // 隐藏其他模块列表
        }
    });
}

// 默认显示第一个按钮对应的模块
updateModuleList('section1');

// Tab pane 切换逻辑
const tabButtons = document.querySelectorAll('.tab-button');
const tabPanes = document.querySelectorAll('.tab-pane');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        // 清除所有tab-button的active状态
        tabButtons.forEach(btn => btn.classList.remove('active'));
        
        // 激活当前tab-button
        button.classList.add('active');
        
        const paneId = button.getAttribute('data-content'); // 获取当前按钮对应的panel ID
        
        // 隐藏所有tab-pane
        tabPanes.forEach(pane => {
            if (pane.id === paneId) {
                pane.style.display = 'block'; // 显示对应的pane
                pane.classList.add('active');
            } else {
                pane.style.display = 'none'; // 隐藏其他pane
                pane.classList.remove('active');
            }
        });
    });
});

// 默认激活第一个tab按钮
tabButtons[0].click(); // 触发一次点击事件以激活第一个tab

function initializeTabs(tabSelector, tabContentSelector) {
    const tabs = document.querySelectorAll(tabSelector);
    const tabContents = document.querySelectorAll(tabContentSelector);
    const tabBar = document.querySelector('.tab-bar');

    // 初始化 Sortable，添加更多限制
    Sortable.create(tabBar, {
        animation: 150,
        filter: '.tab[data-content="1"]', // 排除主程序tab
        draggable: '.tab:not([data-content="1"])', // 只允许非主程序tab拖动
        onMove: function(evt) {
            // 阻止拖动到主程序tab之前的位置
            const targetIndex = evt.related ? Array.from(tabBar.children).indexOf(evt.related) : -1;
            return targetIndex !== 0; // 返回 false 阻止移动到第一个位置
        },
        onEnd: function(evt) {
            // 获取所有非主程序的tab内容
            const contentTabs = Array.from(document.querySelectorAll('.tab:not([data-content="1"])'));
            const contents = contentTabs.map(tab => {
                const contentId = tab.getAttribute('data-content');
                return document.getElementById(`content-${contentId}`);
            });

            // 根据tab的新顺序重新排列内容
            const editorContainer = document.querySelector('.editor-container');
            contents.forEach(content => {
                if (content) {
                    editorContainer.appendChild(content);
                }
            });
        }
    });

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // 清除所有tab的active状态
            tabs.forEach(t => t.classList.remove('active'));
            
            // 激活当前tab
            tab.classList.add('active');
            
            const contentId = tab.getAttribute('data-content');

            // 隐藏所有内容
            tabContents.forEach(content => {
                content.classList.remove('active');
                // 同时隐藏对应的top-bar和right-sidebar
                const topBar = content.querySelector('.top-bar');
                const rightSidebar = content.querySelector('.right-sidebar-container');
                if (topBar) topBar.style.display = 'none';
                if (rightSidebar) rightSidebar.style.display = 'none';
            });
            
            // 处理主程序的组件
            const initialTopBar = document.querySelector('.editor-container > .top-bar');
            const mainRightSidebar = document.querySelector('.main-content > .content-wrapper > .right-sidebar-container');
            
            // 显示对应的内容
            const activeContent = document.getElementById(`content-${contentId}`);
            if (activeContent) {
                activeContent.classList.add('active');
                
                // 如果是主程序tab（content-1），显示初始HTML中的组件
                if (contentId === '1') {
                    if (initialTopBar) initialTopBar.style.display = 'flex';
                    if (mainRightSidebar) mainRightSidebar.style.display = 'flex';
                } else {
                    // 如果不是主程序tab，确保主程序组件被隐藏
                    if (initialTopBar) initialTopBar.style.display = 'none';
                    if (mainRightSidebar) mainRightSidebar.style.display = 'none';
                    
                    // 显示当前tab对应的top-bar和right-sidebar
                    const topBar = activeContent.querySelector('.top-bar');
                    const rightSidebar = activeContent.querySelector('.right-sidebar-container');
                    if (topBar) topBar.style.display = 'flex';
                    if (rightSidebar) rightSidebar.style.display = 'flex';
                }
            }
        });

        // 关闭标签的逻辑
        const closeIcon = tab.querySelector('.close-icon');
        if (closeIcon) {
            closeIcon.addEventListener('click', (event) => {
                event.stopPropagation();
                const contentId = tab.getAttribute('data-content');
                const activeContent = document.getElementById(`content-${contentId}`);

                tab.remove();
                if (activeContent) {
                    activeContent.remove();
                }

                // 如果没有标签被激活，选择最后一个标签激活
                const remainingTabs = document.querySelectorAll(tabSelector);
                if (remainingTabs.length > 0) {
                    remainingTabs[remainingTabs.length - 1].click();
                } else {
                    // 如果没有剩余标签，显示主程序的内容
                    const mainContent = document.getElementById('content-1');
                    if (mainContent) {
                        mainContent.classList.add('active');
                        const mainTopBar = mainContent.querySelector('.top-bar');
                        const mainRightSidebar = mainContent.querySelector('.right-sidebar-container');
                        if (mainTopBar) mainTopBar.style.display = 'flex';
                        if (mainRightSidebar) mainRightSidebar.style.display = 'flex';
                    }
                }
            });
        }
    });
}

// 使用示例
initializeTabs('.tab', '.tab-content');

// 排序下拉菜单逻辑
const sortBtn = document.getElementById('sort-btn');
const sortDropdown = document.getElementById('sort-dropdown');

sortBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // 防止点击事件冒泡
    sortDropdown.style.display = sortDropdown.style.display === 'block' ? 'none' : 'block'; // 切换显示状态
});

// 隐藏下拉菜单当点击其他地方时
document.addEventListener('click', () => {
    sortDropdown.style.display = 'none';
});

// 排序选项点击事件
Array.from(sortDropdown.children).forEach(item => {
    item.addEventListener('click', (e) => {
        console.log(`Sorting by: ${item.dataset.sort}`);
        // 这里可以添加排序逻辑
    });
});

// 筛选功能
const filterButton = document.getElementById('filter-btn');
const filterInput = document.getElementById('filter-input');
const parameterItems = Array.from(parameterList.children);
filterInput.style.display = 'none'; // 隐藏输入框

// 筛选按钮的点击事件
filterButton.addEventListener('click', () => {
    if (filterInput.style.display === 'none' || !filterInput.style.display) {
        filterInput.style.display = 'block'; // 显示输入框
        filterInput.focus(); // 自动聚焦输入框
    } else {
        filterInput.style.display = 'none'; // 隐藏输入框
        filterInput.value = ''; // 清空输入框内容
        resetFilter(); // 重置过滤
    }
});

// 处理输入框实时筛选
filterInput.addEventListener('input', () => {
    const filterValue = filterInput.value.toLowerCase(); // 获取输入的值并转换为小写
    parameterItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (text.includes(filterValue)) {
            item.style.display = 'block'; // 显示符合条件的项
        } else {
            item.style.display = 'none'; // 隐藏不符合条件的项
        }
    });
});

// 重置筛选函数
function resetFilter() {
    parameterItems.forEach(item => {
        item.style.display = 'block'; // 显示所有项
    });
}

// 处理分隔条拖动的逻辑
const resizer = document.querySelector('.resizer');
const leftSidebar = document.querySelector('.left-sidebar'); // 添加对左侧边栏的引用
let isResizing = false;

resizer.addEventListener('mousedown', (event) => {
    isResizing = true; // 开始拖动
});

document.addEventListener('mousemove', (event) => {
    if (!isResizing) return; // 如果没有在拖动，则返回
    const newWidth = event.clientX; // 获取新的宽度
    leftSidebar.style.width = `${newWidth}px`; // 修改左侧边栏的宽度
});

document.addEventListener('mouseup', () => {
    isResizing = false; // 停止拖动
});

// 全局设置功能
const settingsBtn = document.querySelector('.global-settings');
const settingsPanel = document.querySelector('.settings-panel');
const root = document.documentElement;

// 显示/隐藏设置面板
settingsBtn.addEventListener('click', () => {
    settingsPanel.classList.toggle('active');
});

// 透明度控制
document.getElementById('opacity').addEventListener('input', (e) => {
    root.style.setProperty('--global-opacity', e.target.value);
});

// 模糊度控制
document.getElementById('blur').addEventListener('input', (e) => {
    const blurValue = `${e.target.value}px`;
    document.documentElement.style.setProperty('--glass-blur', blurValue);
    
    // 强制更新所有使用磨砂玻璃效果的元素
    const glassElements = document.querySelectorAll(`
        .glass-effect,
        .left-sidebar,
        .right-sidebar,
        .editor,
        .top-bar,
        .tab-bar,
        .module-item,
        .parameter-actions button,
        .dropdown,
        .tab-button,
        .button-sidebar button,
        .button-sidebar,
        .module-list,
        .parameter-list,
        .tab-content,
        .settings-panel,
        ::-webkit-scrollbar-track,
        ::-webkit-scrollbar-thumb
    `);
    
    glassElements.forEach(element => {
        element.style.backdropFilter = `blur(${blurValue})`;
        element.style.webkitBackdropFilter = `blur(${blurValue})`;
    });
    
    // 保存设置
    saveBackgroundSettings();
});

// 背景图片上传
document.getElementById('bgImage').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            document.body.style.backgroundImage = `url(${e.target.result})`;
            saveBackgroundSettings(); // 保存设置
        };
        reader.readAsDataURL(file);
    }
});

// 点击面板外关闭设置
document.addEventListener('click', (e) => {
    if (!settingsPanel.contains(e.target) && !settingsBtn.contains(e.target)) {
        settingsPanel.classList.remove('active');
    }
});

// 背景设置相关的JavaScript
const bgSourceButtons = document.querySelectorAll('.bg-source-options button');
const bgInputContainers = document.querySelectorAll('.bg-input-container');

// 背景来源切换
bgSourceButtons.forEach(button => {
    button.addEventListener('click', () => {
        // 更新按钮状态
        bgSourceButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // 更新输入容器显示
        const sourceType = button.getAttribute('data-source');
        bgInputContainers.forEach(container => {
            container.classList.remove('active');
        });
        
        // 显示对应的输入容器
        const targetContainer = document.getElementById(`${sourceType}-input`) || 
                              document.getElementById(`${sourceType}-upload`) || 
                              document.getElementById(`${sourceType}-options`);
        if (targetContainer) {
            targetContainer.classList.add('active');
        }

        // 保存当前选择的背景来源
        localStorage.setItem('selectedBgSource', sourceType);
    });
});

// URL输入处理
document.getElementById('applyBgUrl').addEventListener('click', () => {
    const url = document.getElementById('bgUrl').value.trim();
    if (url) {
        // 验证URL是否有效
        const img = new Image();
        img.onload = () => {
            document.body.style.backgroundImage = `url(${url})`;
            saveBackgroundSettings(); // 保存设置
        };
        img.onerror = () => {
            alert('无效的图片URL，请检查后重试');
        };
        img.src = url;
    }
});

// 保存背景设置到本地存储
function saveBackgroundSettings() {
    const settings = {
        backgroundImage: document.body.style.backgroundImage,
        opacity: getComputedStyle(document.documentElement).getPropertyValue('--global-opacity'),
        blur: getComputedStyle(document.documentElement).getPropertyValue('--glass-blur')
    };
    localStorage.setItem('backgroundSettings', JSON.stringify(settings));
}

// 加载保存的背景设置
function loadBackgroundSettings() {
    const settings = localStorage.getItem('backgroundSettings');
    if (settings) {
        try {
            const { backgroundImage, opacity, blur } = JSON.parse(settings);
            if (backgroundImage) {
                document.body.style.backgroundImage = backgroundImage;
            }
            if (opacity) {
                document.documentElement.style.setProperty('--global-opacity', opacity);
            }
            if (blur) {
                document.documentElement.style.setProperty('--glass-blur', blur);
            }
        } catch (e) {
            console.error('Error loading background settings:', e);
        }
    }
}

// 页面加载时恢复设置
document.addEventListener('DOMContentLoaded', loadBackgroundSettings);

// 在背景改变时保存设置
['bgImage', 'bgUrl', 'getBingWallpaper'].forEach(id => {
    const element = document.getElementById(id);
    if (element) {
        element.addEventListener('change', saveBackgroundSettings);
    }
});

// 在页面加载完成后，模拟一次透明度调节
document.addEventListener('DOMContentLoaded', function() {
    // 设置初始透明度
    const opacitySlider = document.getElementById('opacity');
    opacitySlider.value = '0.1';
    
    // 创建并触发 input 事件
    const event = new Event('input', {
        bubbles: true,
        cancelable: true,
    });
    opacitySlider.dispatchEvent(event);
    
    // 确保所有组件应用透明度
    document.documentElement.style.setProperty('--global-opacity', '0.1');
    
    // 强制更新所有使用磨砂玻璃效果的元素
    const glassElements = document.querySelectorAll(`
        .left-sidebar,
        .right-sidebar,
        .editor,
        .top-bar,
        .tab-bar,
        .module-item,
        .parameter-actions button,
        .dropdown,
        .tab-button,
        .button-sidebar button,
        .button-sidebar,
        .module-list,
        .parameter-list,
        .tab-content,
        .settings-panel,
        button,
        input[type="text"],
        textarea
    `);
    
    glassElements.forEach(element => {
        element.style.backgroundColor = `rgba(255, 255, 255, 0.1)`;
        element.style.backdropFilter = `blur(8px)`;
        element.style.webkitBackdropFilter = `blur(8px)`;
    });
});

// 修改透明度控制的事件处理
document.getElementById('opacity').addEventListener('input', (e) => {
    const opacity = e.target.value;
    document.documentElement.style.setProperty('--global-opacity', opacity);
    
    // 实时更新所有使用磨砂玻璃效果的元素
    const glassElements = document.querySelectorAll(`
        .left-sidebar,
        .right-sidebar,
        .editor,
        .top-bar,
        .tab-bar,
        .module-item,
        .parameter-actions button,
        .dropdown,
        .tab-button,
        .button-sidebar button,
        .button-sidebar,
        .module-list,
        .parameter-list,
        .tab-content,
        .settings-panel,
        button,
        input[type="text"],
        textarea
    `);
    
    glassElements.forEach(element => {
        element.style.backgroundColor = `rgba(255, 255, 255, ${opacity})`;
    });
});

// 修改页面加载时的背景来源初始化代码
document.addEventListener('DOMContentLoaded', () => {
    const savedSource = localStorage.getItem('selectedBgSource');
    const defaultBgUrl = 'https://cn.bing.com/th?id=OHR.GeckoLeaf_ZH-CN9908456174_1920x1080.jpg';
    const bgUrlInput = document.getElementById('bgUrl');
    const urlButton = document.querySelector('.bg-source-options button[data-source="url"]');

    // 无论是否有保存的设置，都确保URL输入框有默认值
    if (bgUrlInput) {
        bgUrlInput.value = defaultBgUrl;
    }

    if (!savedSource) {
        // 如果没有保存的设置，设置为URL模式并使用默认图片
        if (urlButton) {
            // 激活URL选项
            bgSourceButtons.forEach(btn => btn.classList.remove('active'));
            urlButton.classList.add('active');
            
            // 显示URL输入容器
            bgInputContainers.forEach(container => container.classList.remove('active'));
            document.getElementById('url-input').classList.add('active');
            
            // 直接触发应用按钮的点击事件来应用背景
            const applyButton = document.getElementById('applyBgUrl');
            if (applyButton) {
                applyButton.click();
            }
            
            // 保存设置
            localStorage.setItem('selectedBgSource', 'url');
        }
    } else {
        // 如果有保存的设置，先恢复之前的选择
        const sourceButton = document.querySelector(`.bg-source-options button[data-source="${savedSource}"]`);
        if (sourceButton) {
            sourceButton.click();
        }
        
        // 如果是URL模式，确保输入框和背景图片都正确设置
        if (savedSource === 'url' && bgUrlInput) {
            if (!bgUrlInput.value) {
                bgUrlInput.value = defaultBgUrl;
            }
            // 直接触发应用按钮的点击事件
            const applyButton = document.getElementById('applyBgUrl');
            if (applyButton) {
                applyButton.click();
            }
        }
    }
});

// 修改模式切换相关的代码
const themeSelect = document.getElementById('theme-mode');
const modeSettings = document.querySelectorAll('.mode-settings');

// 保存模式设置
function saveModeSettings() {
    const currentMode = themeSelect.value;
    const settings = {
        mode: currentMode,
        eye: {
            opacity: document.getElementById('eyeOpacity').value,
            brightness: document.getElementById('eyeBrightness').value
        },
        custom: {
            opacity: document.getElementById('opacity').value,
            blur: document.getElementById('blur').value,
            backgroundImage: document.body.style.backgroundImage
        }
    };
    localStorage.setItem('modeSettings', JSON.stringify(settings));
}

// 应用模式设置
function applyModeSettings(mode) {
    // 移除所有模式类
    document.body.classList.remove('eye-mode');
    
    // 隐藏所有模式设置
    modeSettings.forEach(setting => setting.classList.remove('active'));
    
    switch(mode) {
        case 'eye':
            document.body.classList.add('eye-mode');
            document.querySelector('.eye-mode.mode-settings').classList.add('active');
            // 移除背景图片
            document.body.style.backgroundImage = 'none';
            break;
        case 'custom':
            document.querySelector('.custom-mode.mode-settings').classList.add('active');
            // 恢复背景图片
            const settings = JSON.parse(localStorage.getItem('modeSettings') || '{}');
            if (settings.custom && settings.custom.backgroundImage) {
                document.body.style.backgroundImage = settings.custom.backgroundImage;
            }
            break;
    }
}

// 模式选择变化事件
themeSelect.addEventListener('change', () => {
    const mode = themeSelect.value;
    applyModeSettings(mode);
    saveModeSettings();
});

// 护眼模式不透明度控制
document.getElementById('eyeOpacity').addEventListener('input', (e) => {
    const opacity = e.target.value;
    document.documentElement.style.setProperty('--eye-opacity', opacity);
    
    // 实时更新所有护眼模式下的元素
    if (document.body.classList.contains('eye-mode')) {
        const elements = document.querySelectorAll(`
            .glass-effect,
            .left-sidebar,
            .right-sidebar,
            .editor,
            .top-bar,
            .tab-bar,
            .module-item,
            .parameter-actions button,
            .dropdown,
            .tab-button,
            .button-sidebar button,
            .button-sidebar,
            .module-list,
            .parameter-list,
            .tab-content,
            .settings-panel
        `);
        
        elements.forEach(element => {
            element.style.background = `rgba(232, 243, 233, ${opacity})`;
        });
    }
    saveModeSettings();
});

// 护眼模式亮度控制
document.getElementById('eyeBrightness').addEventListener('input', (e) => {
    const brightness = `${e.target.value}%`;
    document.documentElement.style.setProperty('--eye-brightness', brightness);
    
    // 实时更新所有护眼模式下的元素
    if (document.body.classList.contains('eye-mode')) {
        const elements = document.querySelectorAll(`
            .glass-effect,
            .left-sidebar,
            .right-sidebar,
            .editor,
            .top-bar,
            .tab-bar,
            .module-item,
            .parameter-actions button,
            .dropdown,
            .tab-button,
            .button-sidebar button,
            .button-sidebar,
            .module-list,
            .parameter-list,
            .tab-content,
            .settings-panel
        `);
        
        elements.forEach(element => {
            element.style.filter = `brightness(${brightness})`;
        });
    }
    saveModeSettings();
});

// 页面加载时恢复设置
document.addEventListener('DOMContentLoaded', () => {
    const savedSettings = localStorage.getItem('modeSettings');
    if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        
        // 应用保存的模式
        const modeSelect = document.getElementById('theme-mode');
        if (modeSelect) {
            modeSelect.value = settings.mode;
            applyModeSettings(settings.mode);
        }
        
        // 应用各模式的具体设置
        if (settings.eye) {
            document.getElementById('eyeOpacity').value = settings.eye.opacity;
            document.getElementById('eyeBrightness').value = settings.eye.brightness;
        }
        if (settings.custom) {
            document.getElementById('opacity').value = settings.custom.opacity;
            document.getElementById('blur').value = settings.custom.blur;
            if (settings.custom.backgroundImage) {
                document.body.style.backgroundImage = settings.custom.backgroundImage;
            }
        }
    } else {
        // 如果没有保存的设置，默认使用护眼模式
        const modeSelect = document.getElementById('theme-mode');
        if (modeSelect) {
            modeSelect.value = 'eye';
            applyModeSettings('eye');
            
            // 应用护眼模式的默认设置
            const eyeOpacity = document.getElementById('eyeOpacity');
            const eyeBrightness = document.getElementById('eyeBrightness');
            
            if (eyeOpacity) {
                eyeOpacity.value = '0';
                document.documentElement.style.setProperty('--eye-opacity', '0');
            }
            
            if (eyeBrightness) {
                eyeBrightness.value = '100';
                document.documentElement.style.setProperty('--eye-brightness', '100%');
            }
            
            // 保存默认设置
            saveModeSettings();
        }
    }
});

// 添加右侧边栏的resizer功能
document.addEventListener('DOMContentLoaded', () => {
    const rightResizer = document.createElement('div');
    rightResizer.className = 'resizer right-resizer';
    document.querySelector('.editor-container').after(rightResizer);

    let isRightResizing = false;
    let lastRightX;

    rightResizer.addEventListener('mousedown', (e) => {
        isRightResizing = true;
        lastRightX = e.clientX;
    });

    document.addEventListener('mousemove', (e) => {
        if (!isRightResizing) return;

        const editorContainer = document.querySelector('.editor-container');
        const rightSidebar = document.querySelector('.right-sidebar');
        const delta = e.clientX - lastRightX;
        
        const newEditorWidth = editorContainer.offsetWidth + delta;
        const newSidebarWidth = rightSidebar.offsetWidth - delta;

        if (newEditorWidth > 300 && newSidebarWidth > 200) {
            editorContainer.style.flex = `0 0 ${newEditorWidth}px`;
            rightSidebar.style.width = `${newSidebarWidth}px`;
            lastRightX = e.clientX;
        }
    });

    document.addEventListener('mouseup', () => {
        isRightResizing = false;
    });
});

// 添加绑定双击事件的函数
function bindParameterDblClick(parameterDiv) {
    parameterDiv.addEventListener('dblclick', () => {
        const paramName = parameterDiv.textContent.trim();
        
        // 创建磨砂玻璃风格的表单对话框
        const formDialog = document.createElement('div');
        formDialog.className = 'form-dialog glass-effect';
        formDialog.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(0, 0, 0, 0.5);
            z-index: 1000;
        `;

        const formContent = document.createElement('div');
        formContent.className = 'form-content glass-effect';
        formContent.style.cssText = `
            width: 400px;
            padding: 20px;
            border-radius: 12px;
            background: rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(8px);
            border: 1px solid rgba(255, 255, 255, 0.3);
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        `;

        formContent.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <h3 style="margin: 0; font-size: 16px; color: #333;">编辑参数: ${paramName}</h3>
                <button class="close-btn" style="background: none; border: none; cursor: pointer;">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="input-group" style="margin-bottom: 15px;">
                <label style="display: block; margin-bottom: 8px; color: #666;">参数名称</label>
                <input type="text" 
                       class="param-name glass-effect" 
                       value="${paramName}"
                       style="width: 100%; padding: 8px; border-radius: 6px; border: 1px solid rgba(255, 255, 255, 0.2); background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(8px);">
            </div>
            <div class="input-group" style="margin-bottom: 15px;">
                <label style="display: block; margin-bottom: 8px; color: #666;">参数类型</label>
                <select class="param-type glass-effect"
                        style="width: 100%; padding: 8px; border-radius: 6px; border: 1px solid rgba(255, 255, 255, 0.2); background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(8px);">
                    <option value="string">文本</option>
                    <option value="number">数字</option>
                    <option value="boolean">布尔值</option>
                    <option value="array">数组</option>
                    <option value="object">对象</option>
                </select>
            </div>
            <div class="input-group" style="margin-bottom: 15px;">
                <label style="display: block; margin-bottom: 8px; color: #666;">默认值</label>
                <input type="text" 
                       class="param-default glass-effect" 
                       placeholder="请输入默认值"
                       style="width: 100%; padding: 8px; border-radius: 6px; border: 1px solid rgba(255, 255, 255, 0.2); background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(8px);">
            </div>
            <div class="input-group" style="margin-bottom: 15px;">
                <label style="display: block; margin-bottom: 8px; color: #666;">描述</label>
                <textarea class="param-desc glass-effect" 
                          placeholder="请输入参数描述"
                          style="width: 100%; height: 100px; padding: 8px; border-radius: 6px; border: 1px solid rgba(255, 255, 255, 0.2); background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(8px); resize: vertical;"></textarea>
            </div>
            <div style="text-align: right; margin-top: 20px;">
                <button class="save-btn" 
                        style="padding: 8px 16px; background-color: #1a73e8; color: white; border: none; border-radius: 4px; margin-right: 10px; backdrop-filter: blur(8px);">
                    保存
                </button>
                <button class="cancel-btn" 
                        style="padding: 8px 16px; background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 4px; backdrop-filter: blur(8px);">
                    取消
                </button>
            </div>
        `;

        formDialog.appendChild(formContent);
        document.body.appendChild(formDialog);

        // 绑定关闭事件
        const closeForm = () => {
            document.body.removeChild(formDialog);
        };

        formContent.querySelector('.close-btn').addEventListener('click', closeForm);
        formContent.querySelector('.cancel-btn').addEventListener('click', closeForm);
        formContent.querySelector('.save-btn').addEventListener('click', () => {
            const newName = formContent.querySelector('.param-name').value;
            const type = formContent.querySelector('.param-type').value;
            const defaultValue = formContent.querySelector('.param-default').value;
            const description = formContent.querySelector('.param-desc').value;
            
            // 更新参数显示，包括图标
            parameterDiv.innerHTML = `<i class="fas ${PARAM_TYPE_ICONS[type] || PARAM_TYPE_ICONS.default}"></i> ${newName}`;
            
            console.log('保存参数设置:', { newName, type, defaultValue, description });
            closeForm();
        });

        // 点击对话框外部关闭
        formDialog.addEventListener('click', (e) => {
            if (e.target === formDialog) {
                closeForm();
            }
        });
    });
}

// 修改 initializeParameterList 函数中的添加按钮事件
function initializeParameterList(moduleName) {
    const parameterList = document.getElementById(`parameter-list-${moduleName}`);
    const addButton = document.getElementById(`add-btn-${moduleName}`);
    const deleteButton = document.getElementById(`delete-btn-${moduleName}`);
    let lastSelectedIndex = -1;

    // 修改添加按钮事件
    if (addButton) {
        const newButton = addButton.cloneNode(true);
        addButton.parentNode.replaceChild(newButton, addButton);
        
        newButton.addEventListener('click', () => {
            const newItem = createParameterItem(
                '新参数 ' + (parameterList.children.length + 1),
                'string',
                parameterList,
                lastSelectedIndex
            );
            parameterList.appendChild(newItem);
        });
    }

    // 修改删除按钮事件
    if (deleteButton) {
        deleteButton.addEventListener('click', () => {
            const selectedItems = parameterList.querySelectorAll('div.selected');
            selectedItems.forEach(selectedItem => {
                parameterList.removeChild(selectedItem);
            });
            lastSelectedIndex = -1;
        });
    }

    // 添加筛选功能
    const filterBtn = document.getElementById(`filter-btn-${moduleName}`);
    const filterInput = document.getElementById(`filter-input-${moduleName}`);
    
    if (filterBtn && filterInput) {
        filterBtn.addEventListener('click', () => {
            // 修改显示/隐藏逻辑
            if (filterInput.style.display === 'none' || !filterInput.style.display) {
                filterInput.style.display = 'block';
            } else {
                filterInput.style.display = 'none';
                filterInput.value = '';
                Array.from(parameterList.children).forEach(item => {
                    item.style.display = 'block';
                });
            }
        });

        filterInput.addEventListener('input', () => {
            const filterValue = filterInput.value.toLowerCase();
            Array.from(parameterList.children).forEach(item => {
                // 获取纯文本内容（排除图标）
                const text = item.textContent.replace(/^\s*/, '').toLowerCase(); // 移除开头的空白字符
                item.style.display = text.includes(filterValue) ? 'block' : 'none';
            });
        });
    }

    // 为现有的参数项绑定事件
    Array.from(parameterList.children).forEach((item, index) => {
        const text = item.textContent.trim();
        item.innerHTML = `<i class="fas ${PARAM_TYPE_ICONS.default}"></i> ${text}`;
        
        item.addEventListener('click', (event) => {
            if (event.ctrlKey) {
                item.classList.toggle('selected');
            } else if (event.shiftKey && lastSelectedIndex !== -1) {
                const start = Math.min(lastSelectedIndex, index);
                const end = Math.max(lastSelectedIndex, index);
                
                Array.from(parameterList.children).forEach((el, i) => {
                    if (i >= start && i <= end) {
                        el.classList.add('selected');
                    } else {
                        el.classList.remove('selected');
                    }
                });
            } else {
                Array.from(parameterList.children).forEach(el => el.classList.remove('selected'));
                item.classList.add('selected');
            }

            if (!event.ctrlKey) {
                lastSelectedIndex = index;
            }
        });

        bindParameterDblClick(item);
    });

    // ... 其他代码保持不变 ...
}

// 在 DOMContentLoaded 事件中添加对主程序 parameter-list 的初始化
document.addEventListener('DOMContentLoaded', () => {
    // ... 其他现有的 DOMContentLoaded 代码 ...

    // 初始化主程序的 parameter-list
    const mainParameterList = document.querySelector('.main-content .parameter-list');
    if (mainParameterList) {
        // 为现有参数添加图标
        mainParameterList.querySelectorAll('div').forEach(item => {
            const text = item.textContent.trim();
            item.innerHTML = `<i class="fas ${PARAM_TYPE_ICONS.default}"></i> ${text}`;
            bindParameterDblClick(item);
        });

        // 修改主程序添加按钮事件，移除重复的事件绑定
        const mainAddButton = document.getElementById('add-btn');
        if (mainAddButton) {
            // 移除所有现有的点击事件监听器
            const newButton = mainAddButton.cloneNode(true);
            mainAddButton.parentNode.replaceChild(newButton, mainAddButton);
            
            // 重新绑定单个点击事件
            newButton.addEventListener('click', () => {
                const newItem = createParameterItem(
                    '新参数 ' + (mainParameterList.children.length + 1),
                    'string',
                    mainParameterList,
                    lastSelectedIndex
                );
                mainParameterList.appendChild(newItem);
            });
        }
    }
});

// 修改 createParameterItem 函数，添加所有必要的事件绑定
function createParameterItem(name, type = 'string', parameterList, lastSelectedIndex) {
    const div = document.createElement('div');
    div.innerHTML = `<i class="fas ${PARAM_TYPE_ICONS[type] || PARAM_TYPE_ICONS.default}"></i> ${name}`;
    
    // 添加点击事件（支持 Ctrl 和 Shift 多选）
    div.addEventListener('click', (event) => {
        const allItems = Array.from(parameterList.children);
        const currentIndex = allItems.indexOf(div);

        if (event.ctrlKey) {
            div.classList.toggle('selected');
        } else if (event.shiftKey && lastSelectedIndex !== -1) {
            const start = Math.min(lastSelectedIndex, currentIndex);
            const end = Math.max(lastSelectedIndex, currentIndex);
            
            allItems.forEach((item, index) => {
                if (index >= start && index <= end) {
                    item.classList.add('selected');
                } else {
                    item.classList.remove('selected');
                }
            });
        } else {
            allItems.forEach(item => item.classList.remove('selected'));
            div.classList.add('selected');
        }

        // 更新最后选中的索引
        if (!event.ctrlKey) {
            lastSelectedIndex = currentIndex;
        }
    });

    // 添加双击编辑事件
    bindParameterDblClick(div);

    return div;
}

// 修改主程序的筛选功能
document.addEventListener('DOMContentLoaded', () => {
    // ... 其他代码保持不变 ...

    // 为主程序添加筛选功能
    const mainFilterBtn = document.querySelector('.main-content .parameter-actions #filter-btn');
    const mainFilterInput = document.querySelector('.main-content .right-sidebar #filter-input');
    const mainParameterList = document.querySelector('.main-content .parameter-list');
    
    if (mainFilterBtn && mainFilterInput && mainParameterList) {
        // 移除可能存在的旧事件监听器
        const newFilterBtn = mainFilterBtn.cloneNode(true);
        mainFilterBtn.parentNode.replaceChild(newFilterBtn, mainFilterBtn);

        newFilterBtn.addEventListener('click', () => {
            // 修改显示/隐藏逻辑
            if (mainFilterInput.style.display === 'none' || !mainFilterInput.style.display) {
                mainFilterInput.style.display = 'block';
                mainFilterInput.focus(); // 自动聚焦到输入框
            } else {
                mainFilterInput.style.display = 'none';
                mainFilterInput.value = '';
                Array.from(mainParameterList.children).forEach(item => {
                    item.style.display = 'block';
                });
            }
        });

        mainFilterInput.addEventListener('input', () => {
            const filterValue = mainFilterInput.value.toLowerCase();
            Array.from(mainParameterList.children).forEach(item => {
                // 获取纯文本内容（排除图标）
                const text = item.textContent.replace(/^\s*/, '').toLowerCase();
                item.style.display = text.includes(filterValue) ? 'block' : 'none';
            });
        });
    }
});

// 在 DOMContentLoaded 事件中加载 JSON 文件并生成左侧模块
document.addEventListener('DOMContentLoaded', () => {
    fetch('modules.json')
        .then(response => response.json())
        .then(data => {
            // 遍历每个分类（actionModules, actionSubPrograms等）
            Object.entries(data).forEach(([category, categoryData], categoryIndex) => {
                const categorySection = document.querySelector(`.bottom-section[data-section="${categoryIndex + 1}"]`);
                if (!categorySection) return;

                // 获取按钮侧边栏和模块容器
                const buttonSidebar = categorySection.querySelector('.button-sidebar');
                const modulesContainer = categorySection.querySelector('.modules-container');
                
                if (!buttonSidebar || !modulesContainer) return;

                // 清空现有内容
                    buttonSidebar.innerHTML = '';
                modulesContainer.innerHTML = '';

                // 创建并添加按钮和对应的模块列表
                    categoryData.sections.forEach((section, index) => {
                    // 创建按钮
                        const button = document.createElement('button');
                        button.setAttribute('data-modules', section.id);
                    if (index === 0) {
                        button.classList.add('active');
                    }
                        button.innerHTML = `<i class="fas ${section.icon}"></i>`;
                        buttonSidebar.appendChild(button);

                    // 创建对应的模块列表容器
                    const moduleList = document.createElement('div');
                    moduleList.className = `module-list ${section.id}`;
                    moduleList.style.display = index === 0 ? 'block' : 'none';

                    // 添加筛选输入框
                    const filterInput = document.createElement('input');
                    filterInput.type = 'text';
                    filterInput.className = 'module-filter';
                    filterInput.placeholder = '筛选模块...';
                    moduleList.appendChild(filterInput);

                    // 添加模块项
                    section.modules.forEach(module => {
                        const moduleItem = document.createElement('div');
                        moduleItem.className = 'module-item';
                        moduleItem.draggable = true;
                        moduleItem.innerHTML = `<i class="fas ${module.icon}"></i>${module.name}`;
                        moduleList.appendChild(moduleItem);
                    });

                    modulesContainer.appendChild(moduleList);

                        // 为按钮添加点击事件
                        button.addEventListener('click', () => {
                            // 移除所有按钮的active类
                            buttonSidebar.querySelectorAll('button').forEach(btn => {
                                btn.classList.remove('active');
                            });
                            button.classList.add('active');

                            // 隐藏所有模块列表
                        modulesContainer.querySelectorAll('.module-list').forEach(list => {
                                list.style.display = 'none';
                            });

                            // 显示对应的模块列表
                        const targetModuleList = modulesContainer.querySelector(`.module-list.${section.id}`);
                        if (targetModuleList) {
                            targetModuleList.style.display = 'block';
                            }
                        });
                    });

                // 初始化拖拽功能
                const moduleLists = modulesContainer.querySelectorAll('.module-list');
                moduleLists.forEach(moduleList => {
                    Sortable.create(moduleList, {
                        group: {
                            name: 'shared',
                            pull: 'clone',
                            put: false,
                        },
                        sort: false,
                        animation: 150
                    });

                    // 初始化筛选功能
                        const filterInput = moduleList.querySelector('.module-filter');
                    const moduleItems = Array.from(moduleList.querySelectorAll('.module-item'));

                    filterInput.addEventListener('input', () => {
                        const filterValue = filterInput.value.toLowerCase();
                        moduleItems.forEach(item => {
                            const text = item.textContent.toLowerCase();
                            item.style.display = text.includes(filterValue) ? 'flex' : 'none';
                        });
                    });

                            // 为非动作模块添加双击事件
                            if (categoryIndex > 0) {
                        moduleItems.forEach(moduleItem => {
                                moduleItem.addEventListener('dblclick', () => {
                                    const moduleName = moduleItem.textContent.trim();
                                    const editorContainer = document.querySelector('.editor-container');
                                    const existingTabContent = editorContainer.querySelector(`#content-${moduleName}`);
                                    const tabBar = document.querySelector('.tab-bar');

                                    if (existingTabContent) {
                                        // 如果已存在同名tab，切换到该tab
                                    document.querySelectorAll('.tab-content').forEach(content => {
                                        content.classList.remove('active');
                                        });
                                        existingTabContent.classList.add('active');

                                    tabBar.querySelectorAll('.tab').forEach(tab => {
                                            tab.classList.remove('active');
                                        });
                                        const existingTab = tabBar.querySelector(`[data-content="${moduleName}"]`);
                                        if (existingTab) {
                                            existingTab.classList.add('active');
                                        }
                                    } else {
                                    // 创建新的tab和内容
                                    createNewTab(moduleName, moduleItem);
                                                        }
                                                    });
                                                });
                    }
                });
            });
        })
        .catch(error => {
            console.error('Error loading modules:', error);
        });
});

// 在 DOMContentLoaded 事件中添加主程序 editor 的初始化
document.addEventListener('DOMContentLoaded', () => {
    // 初始化主程序的 editor
    const mainEditor = document.querySelector('.editor-container .editor');
    if (mainEditor) {
        Sortable.create(mainEditor, {
            group: {
                name: 'shared'
            },
            animation: 150,
            onAdd: function(evt) {
                const item = evt.item;
                const newItem = item.cloneNode(true);
                
                // 添加按钮容器
                const actionButtons = document.createElement('div');
                actionButtons.className = 'module-action-buttons';
                actionButtons.style.cssText = `
                    position: absolute;
                    right: 8px;
                    top: 50%;
                    transform: translateY(-50%);
                    display: none;
                    gap: 4px;
                    background: rgba(255, 255, 255, 0.1);
                    padding: 4px;
                    border-radius: 4px;
                    backdrop-filter: blur(8px);
                `;

                // 添加编辑按钮
                const editButton = document.createElement('button');
                editButton.className = 'module-edit-btn';
                editButton.innerHTML = '<i class="fas fa-edit"></i>';
                editButton.style.cssText = `
                    border: none;
                    background: transparent;
                    color: #1a73e8;
                    cursor: pointer;
                    padding: 4px;
                    border-radius: 4px;
                    transition: background-color 0.2s;
                `;
                editButton.addEventListener('mouseover', () => {
                    editButton.style.backgroundColor = 'rgba(26, 115, 232, 0.1)';
                });
                editButton.addEventListener('mouseout', () => {
                    editButton.style.backgroundColor = 'transparent';
                });

                // 添加删除按钮
                const deleteButton = document.createElement('button');
                deleteButton.className = 'module-delete-btn';
                deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
                deleteButton.style.cssText = `
                    border: none;
                    background: transparent;
                    color: #dc3545;
                    cursor: pointer;
                    padding: 4px;
                    border-radius: 4px;
                    transition: background-color 0.2s;
                `;
                deleteButton.addEventListener('mouseover', () => {
                    deleteButton.style.backgroundColor = 'rgba(220, 53, 69, 0.1)';
                });
                deleteButton.addEventListener('mouseout', () => {
                    deleteButton.style.backgroundColor = 'transparent';
                });

                // 添加按钮到容器
                actionButtons.appendChild(editButton);
                actionButtons.appendChild(deleteButton);

                // 设置新项的样式和结构
                newItem.style.position = 'relative';
                newItem.appendChild(actionButtons);

                // 添加鼠标悬停事件
                newItem.addEventListener('mouseenter', () => {
                    actionButtons.style.display = 'flex';
                });
                newItem.addEventListener('mouseleave', () => {
                    actionButtons.style.display = 'none';
                });

                // 绑定双击和编辑按钮事件
                const handleEdit = () => {
                    const moduleName = newItem.textContent.trim();
                    showEditModal(moduleName, newItem);
                };

                newItem.addEventListener('dblclick', handleEdit);
                editButton.addEventListener('click', handleEdit);

                // 修改删除按钮点击事件处理
                deleteButton.addEventListener('click', () => {
                    // 创建磨砂风格的确认对话框
                    const confirmDialog = document.createElement('div');
                    confirmDialog.className = 'confirm-dialog glass-effect';
                    confirmDialog.style.cssText = `
                        position: fixed;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        background: rgba(0, 0, 0, 0.5);
                        z-index: 1000;
                    `;

                    const dialogContent = document.createElement('div');
                    dialogContent.className = 'dialog-content glass-effect';
                    dialogContent.style.cssText = `
                        width: 300px;
                        padding: 20px;
                        border-radius: 12px;
                        background: rgba(255, 255, 255, 0.2);
                        backdrop-filter: blur(8px);
                        border: 1px solid rgba(255, 255, 255, 0.3);
                        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    `;

                    dialogContent.innerHTML = `
                        <div style="margin-bottom: 20px; color: #000; font-size: 16px; font-weight: 600;">
                            确定要删除这个模块吗？
                        </div>
                        <div style="text-align: right;">
                            <button class="confirm-yes" 
                                    style="padding: 8px 16px; background: rgba(255, 255, 255, 0.15); color: #000; border: 1px solid rgba(0, 0, 0, 0.1); border-radius: 4px; margin-right: 10px; backdrop-filter: blur(8px); font-weight: 600;">
                                删除
                            </button>
                            <button class="confirm-no" 
                                    style="padding: 8px 16px; background: rgba(255, 255, 255, 0.15); color: #000; border: 1px solid rgba(0, 0, 0, 0.1); border-radius: 4px; backdrop-filter: blur(8px); font-weight: 600;">
                                取消
                            </button>
                        </div>
                    `;

                    confirmDialog.appendChild(dialogContent);
                    document.body.appendChild(confirmDialog);

                    // 绑定确认对话框按钮事件
                    const closeDialog = () => {
                        document.body.removeChild(confirmDialog);
                    };

                    // 确认按钮
                    dialogContent.querySelector('.confirm-yes').addEventListener('click', () => {
                        newItem.remove();
                        closeDialog();
                    });

                    // 取消按钮
                    dialogContent.querySelector('.confirm-no').addEventListener('click', closeDialog);

                    // 点击对话框外部关闭
                    confirmDialog.addEventListener('click', (e) => {
                        if (e.target === confirmDialog) {
                            closeDialog();
                        }
                    });
                });

                // 替换原始项
                item.parentNode.replaceChild(newItem, item);
            }
        });
    }
});

// 添加显示编辑模态框的通用函数
function showEditModal(moduleName, moduleItem) {
    // 创建模态框容器
    const modalContainer = document.createElement('div');
    modalContainer.className = 'modal-container glass-effect';
    modalContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(0, 0, 0, 0.5);
        z-index: 1000;
    `;

    // 创建表单内容
    const formContent = document.createElement('div');
    formContent.className = 'modal-content glass-effect';
    formContent.style.cssText = `
        width: 400px;
        padding: 20px;
        border-radius: 12px;
        background: rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(8px);
        border: 1px solid rgba(255, 255, 255, 0.3);
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    `;

    formContent.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
            <h3 style="margin: 0; font-size: 16px; color: #333;">编辑模块: ${moduleName}</h3>
            <button class="close-btn" style="background: none; border: none; cursor: pointer;">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <div class="input-group" style="margin-bottom: 15px;">
            <label style="display: block; margin-bottom: 8px; color: #666;">模块名称</label>
            <input type="text" 
                   id="module-name" 
                   value="${moduleName}"
                   class="form-input glass-effect"
                   style="width: 100%; padding: 8px; border-radius: 6px; border: 1px solid rgba(255, 255, 255, 0.2); background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(8px);">
        </div>
        <div class="input-group" style="margin-bottom: 15px;">
            <label style="display: block; margin-bottom: 8px; color: #666;">描述</label>
            <textarea id="module-description" 
                      class="form-input glass-effect"
                      style="width: 100%; height: 100px; padding: 8px; border-radius: 6px; border: 1px solid rgba(255, 255, 255, 0.2); background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(8px); resize: vertical;"></textarea>
        </div>
        <div style="text-align: right; margin-top: 20px;">
            <button class="save-btn" 
                    style="padding: 8px 16px; background-color: #1a73e8; color: white; border: none; border-radius: 4px; margin-right: 10px; backdrop-filter: blur(8px);">
                保存
            </button>
            <button class="cancel-btn" 
                    style="padding: 8px 16px; background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 4px; backdrop-filter: blur(8px);">
                取消
            </button>
        </div>
    `;

    modalContainer.appendChild(formContent);
    document.body.appendChild(modalContainer);

    // 绑定关闭事件
    const closeModal = () => {
        document.body.removeChild(modalContainer);
    };

    formContent.querySelector('.close-btn').addEventListener('click', closeModal);
    formContent.querySelector('.cancel-btn').addEventListener('click', closeModal);
    formContent.querySelector('.save-btn').addEventListener('click', () => {
        const newName = document.getElementById('module-name').value;
        const description = document.getElementById('module-description').value;
        
        // 更新模块显示
        const iconElement = moduleItem.querySelector('i');
        const iconClass = iconElement ? iconElement.className : '';
        moduleItem.innerHTML = `<i class="${iconClass}"></i>${newName}`;
        
        // 重新添加操作按钮
        const actionButtons = moduleItem.querySelector('.module-action-buttons');
        if (actionButtons) {
            moduleItem.appendChild(actionButtons);
        }
        
        console.log('保存模块设置:', { newName, description });
        closeModal();
    });

    // 点击模态框外部关闭
    modalContainer.addEventListener('click', (e) => {
        if (e.target === modalContainer) {
            closeModal();
        }
    });
}
