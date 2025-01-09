const defaultBgUrl = 'https://cn.bing.com/th?id=OHR.GeckoLeaf_ZH-CN9908456174_1920x1080.jpg';

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
                    // 如果不存在同名tab，创建新的tab和内容
                    const newTabContent = document.createElement('div');
                    newTabContent.className = 'tab-content';
                    newTabContent.id = `content-${moduleName}`;
                    newTabContent.innerHTML = `<div class="editor" id="${moduleName}"></div>`;
                    editorContainer.appendChild(newTabContent);

                    // 为新创建的编辑器绑定Sortable功能
                    Sortable.create(newTabContent.querySelector('.editor'), {
                        group: {
                            name: 'shared'
                        },
                        animation: 150,
                        onAdd: function(evt) {
                            const item = evt.item;
                            // 移除所有现有的事件监听器
                            const newItem = item.cloneNode(true);
                            item.parentNode.replaceChild(newItem, item);
                            
                            // 只绑定新的双击事件（显示 alert）
                            newItem.addEventListener('dblclick', () => {
                                const moduleName = newItem.textContent.trim();
                                alert(`编辑模块: ${moduleName}`);
                            });
                        }
                    });

                    // 创建新的tab
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
            
            // 只绑定新的双击事件（显示 alert）
            newItem.addEventListener('dblclick', () => {
                const moduleName = newItem.textContent.trim();
                alert(`编辑模块: ${moduleName}`);
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
    // Tab 切换和关闭的逻辑
    const tabs = document.querySelectorAll(tabSelector);
    const tabContents = document.querySelectorAll(tabContentSelector);

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // 清除所有tab的active状态
            tabs.forEach(t => t.classList.remove('active'));
            
            // 激活当前tab
            tab.classList.add('active');
            
            const contentId = tab.getAttribute('data-content');

            // 隐藏所有tab-content
            tabContents.forEach(content => {
                content.classList.remove('active'); // 使用类名控制显示
            });
            
            // 显示对应的tab-content
            const activeContent = document.getElementById(`content-${contentId}`);
            if(activeContent) {
                activeContent.classList.add('active'); // 使用类名控制显示
            }
        });

        // 关闭标签的逻辑
        const closeIcon = tab.querySelector('.close-icon');
        if (closeIcon) { // 确保关闭图标存在
            closeIcon.addEventListener('click', (event) => {
                event.stopPropagation(); // 防止事件冒泡
                const contentId = tab.getAttribute('data-content');
                const activeContent = document.getElementById(`content-${contentId}`);

                tab.remove(); // 移除标签
                if (activeContent) {
                    activeContent.remove(); // 移除对应的内容
                }

                // 如果没有标签被激活，选择下一个标签激活
                const remainingTabs = document.querySelectorAll(tabSelector);
                if (remainingTabs.length > 0) {
                    remainingTabs[remainingTabs.length - 1].click(); // 点击最后一个标签
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

// 获取必应今日壁纸
document.getElementById('getBingWallpaper').addEventListener('click', () => {
    // 修改为新的随机必应壁纸URL
    const bingUrl = 'https://bing.img.run/rand_uhd.php';
    document.body.style.backgroundImage = `url(${bingUrl})`;
    saveBackgroundSettings(); // 保存设置
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

// 护眼模式设置变化事件
document.getElementById('eyeOpacity').addEventListener('input', (e) => {
    document.documentElement.style.setProperty('--eye-opacity', e.target.value);
    saveModeSettings();
});

document.getElementById('eyeBrightness').addEventListener('input', (e) => {
    document.documentElement.style.setProperty('--eye-brightness', `${e.target.value}%`);
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
        // 如果没有保存的设置，默认使用磨砂玻璃风格
        const modeSelect = document.getElementById('theme-mode');
        if (modeSelect) {
            modeSelect.value = 'custom';
            applyModeSettings('custom');
            
            // 设置默认背景图片
            const defaultBgUrl = 'https://cn.bing.com/th?id=OHR.GeckoLeaf_ZH-CN9908456174_1920x1080.jpg';
            
            // 先设置URL输入框的值
            const bgUrlInput = document.getElementById('bgUrl');
            if (bgUrlInput) {
                bgUrlInput.value = defaultBgUrl;
            }
            
            // 验证并应用背景图片
            const img = new Image();
            img.onload = () => {
                document.body.style.backgroundImage = `url("${defaultBgUrl}")`;
                // 保存设置
                saveModeSettings();
            };
            img.onerror = () => {
                console.error('默认背景图片加载失败');
            };
            img.src = defaultBgUrl;
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
