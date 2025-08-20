/**
 * PDF预览组件
 * 提供PDF文档的在线预览功能
 */

class PDFPreview {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.currentPDF = null;
        this.init();
    }
    
    init() {
        this.createModal();
    }
    
    createModal() {
        const modal = document.createElement('div');
        modal.className = 'pdf-preview-modal';
        modal.id = 'pdfPreviewModal';
        modal.innerHTML = `
            <div class="pdf-modal-content">
                <div class="pdf-modal-header">
                    <h3 class="pdf-modal-title">文档预览</h3>
                    <div class="pdf-modal-actions">
                        <button class="pdf-btn pdf-download-btn" id="pdfDownloadBtn">
                            <span>⬇️</span> 下载
                        </button>
                        <button class="pdf-btn pdf-close-btn" id="pdfCloseBtn">
                            <span>✕</span> 关闭
                        </button>
                    </div>
                </div>
                <div class="pdf-modal-body">
                    <div class="pdf-loading" id="pdfLoading">
                        <div class="pdf-spinner"></div>
                        <p>正在加载PDF...</p>
                    </div>
                    <div class="pdf-error" id="pdfError" style="display: none;">
                        <p>❌ 无法加载PDF文档</p>
                        <p>请尝试下载文档或使用其他PDF阅读器。</p>
                    </div>
                    <div class="pdf-container" id="pdfContainer">
                        <iframe id="pdfFrame" frameborder="0"></iframe>
                    </div>
                </div>
            </div>
        `;
        
        // 添加样式
        const style = document.createElement('style');
        style.textContent = `
            .pdf-preview-modal {
                display: none;
                position: fixed;
                z-index: 1000;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                backdrop-filter: blur(5px);
            }
            
            .pdf-modal-content {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 90%;
                height: 90%;
                max-width: 1200px;
                max-height: 800px;
                background: white;
                border-radius: 10px;
                overflow: hidden;
                box-shadow: 0 10px 50px rgba(0, 0, 0, 0.5);
            }
            
            .pdf-modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 1rem 1.5rem;
                background: #f8f9fa;
                border-bottom: 1px solid #e9ecef;
            }
            
            .pdf-modal-title {
                margin: 0;
                color: #333;
                font-size: 1.2rem;
                font-weight: 600;
            }
            
            .pdf-modal-actions {
                display: flex;
                gap: 0.5rem;
            }
            
            .pdf-btn {
                padding: 0.5rem 1rem;
                border: none;
                border-radius: 5px;
                font-size: 0.9rem;
                font-weight: 500;
                cursor: pointer;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }
            
            .pdf-download-btn {
                background: #28a745;
                color: white;
            }
            
            .pdf-download-btn:hover {
                background: #218838;
            }
            
            .pdf-close-btn {
                background: #6c757d;
                color: white;
            }
            
            .pdf-close-btn:hover {
                background: #545b62;
            }
            
            .pdf-modal-body {
                height: calc(100% - 70px);
                position: relative;
            }
            
            .pdf-loading {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                height: 100%;
                color: #666;
            }
            
            .pdf-spinner {
                width: 40px;
                height: 40px;
                border: 3px solid #f3f3f3;
                border-top: 3px solid #667eea;
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin-bottom: 1rem;
            }
            
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            
            .pdf-error {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                height: 100%;
                color: #dc3545;
                text-align: center;
                padding: 2rem;
            }
            
            .pdf-container {
                width: 100%;
                height: 100%;
            }
            
            #pdfFrame {
                width: 100%;
                height: 100%;
                border: none;
            }
            
            @media (max-width: 768px) {
                .pdf-modal-content {
                    width: 95%;
                    height: 95%;
                }
                
                .pdf-modal-header {
                    padding: 1rem;
                }}
                
                .pdf-modal-title {
                    font-size: 1rem;
                }
                
                .pdf-btn {
                    padding: 0.4rem 0.8rem;
                    font-size: 0.8rem;
                }
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(modal);
        
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        const modal = document.getElementById('pdfPreviewModal');
        const closeBtn = document.getElementById('pdfCloseBtn');
        const downloadBtn = document.getElementById('pdfDownloadBtn');
        
        // 关闭按钮
        closeBtn.addEventListener('click', () => this.close());
        
        // 点击背景关闭
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.close();
            }
        });
        
        // ESC键关闭
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.style.display === 'block') {
                this.close();
            }
        });
        
        // 下载按钮
        downloadBtn.addEventListener('click', () => {
            if (this.currentPDF) {
                const link = document.createElement('a');
                link.href = this.currentPDF.url;
                link.download = this.currentPDF.filename || 'document.pdf';
                link.click();
            }
        });
    }
    
    open(pdfUrl, filename = null, title = null) {
        const modal = document.getElementById('pdfPreviewModal');
        const titleElement = document.querySelector('.pdf-modal-title');
        const loading = document.getElementById('pdfLoading');
        const error = document.getElementById('pdfError');
        const container = document.getElementById('pdfContainer');
        const frame = document.getElementById('pdfFrame');
        
        // 设置当前PDF信息
        this.currentPDF = {
            url: pdfUrl,
            filename: filename || 'document.pdf',
            title: title || '文档预览'
        };
        
        // 更新标题
        titleElement.textContent = this.currentPDF.title;
        
        // 显示模态框
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // 重置状态
        loading.style.display = 'flex';
        error.style.display = 'none';
        container.style.display = 'none';
        
        // 尝试加载PDF
        this.loadPDF(pdfUrl);
    }
    
    loadPDF(pdfUrl) {
        const loading = document.getElementById('pdfLoading');
        const error = document.getElementById('pdfError');
        const container = document.getElementById('pdfContainer');
        const frame = document.getElementById('pdfFrame');
        
        // 检查是否为PDF文件
        if (!pdfUrl.toLowerCase().endsWith('.pdf')) {
            this.showError('该文件不是PDF格式，无法预览');
            return;
        }
        
        // 使用Google Docs Viewer或PDF.js
        const viewerUrls = [
            `https://docs.google.com/viewer?url=${encodeURIComponent(pdfUrl)}&embedded=true`,
            `https://mozilla.github.io/pdf.js/web/viewer.html?file=${encodeURIComponent(pdfUrl)}`,
            pdfUrl // 直接加载PDF
        ];
        
        this.tryLoadPDF(viewerUrls, 0);
    }
    
    tryLoadPDF(viewerUrls, index) {
        if (index >= viewerUrls.length) {
            this.showError('无法加载PDF预览，请尝试下载文件');
            return;
        }
        
        const loading = document.getElementById('pdfLoading');
        const error = document.getElementById('pdfError');
        const container = document.getElementById('pdfContainer');
        const frame = document.getElementById('pdfFrame');
        
        const url = viewerUrls[index];
        
        frame.onload = () => {
            loading.style.display = 'none';
            container.style.display = 'block';
        };
        
        frame.onerror = () => {
            console.warn(`PDF viewer ${index + 1} failed, trying next...`);
            this.tryLoadPDF(viewerUrls, index + 1);
        };
        
        // 设置超时
        const timeout = setTimeout(() => {
            console.warn(`PDF viewer ${index + 1} timeout, trying next...`);
            this.tryLoadPDF(viewerUrls, index + 1);
        }, 10000);
        
        frame.onload = () => {
            clearTimeout(timeout);
            loading.style.display = 'none';
            container.style.display = 'block';
        };
        
        frame.src = url;
    }
    
    showError(message) {
        const loading = document.getElementById('pdfLoading');
        const error = document.getElementById('pdfError');
        const container = document.getElementById('pdfContainer');
        
        loading.style.display = 'none';
        container.style.display = 'none';
        error.style.display = 'flex';
        error.querySelector('p').textContent = `❌ ${message}`;
    }
    
    close() {
        const modal = document.getElementById('pdfPreviewModal');
        const frame = document.getElementById('pdfFrame');
        
        modal.style.display = 'none';
        document.body.style.overflow = '';
        
        // 清空iframe
        frame.src = '';
        this.currentPDF = null;
    }
}

// 全局PDF预览实例
window.pdfPreview = new PDFPreview();

// 便捷函数
window.openPDFPreview = (url, filename, title) => {
    window.pdfPreview.open(url, filename, title);
};

// 为文档页面添加预览功能
document.addEventListener('DOMContentLoaded', () => {
    // 自动为PDF链接添加预览功能
    document.addEventListener('click', (e) => {
        const target = e.target.closest('.btn-preview');
        if (target && target.href && target.href.toLowerCase().includes('.pdf')) {
            e.preventDefault();
            const title = target.closest('.document-item')?.querySelector('.document-title')?.textContent || '文档预览';
            const filename = target.href.split('/').pop();
            window.openPDFPreview(target.href, filename, title);
        }
    });
});

export default PDFPreview;