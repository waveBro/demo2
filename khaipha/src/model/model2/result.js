document.addEventListener('DOMContentLoaded', function() {
    const resultData = JSON.parse(localStorage.getItem('predict_result'));
    if (!resultData) {
        document.getElementById('result-content').innerHTML = `
            <div class="result-prediction" style="color: #d9534f;">
                Không tìm thấy kết quả dự đoán!
            </div>
        `;
        return;
    }

    const probability = resultData.probability * 100;
    const resultColor = resultData.prediction === 1 ? '#d9534f' : '#5cb85c';
    
    // Get risk assessment and recommendations
    const riskAssessment = getRiskAssessment(probability);

    document.getElementById('result-content').innerHTML = `
        <div class="result-prediction" style="color: ${resultColor}">
            ${resultData.result}
        </div>
        <div class="probabilities">
            <div class="prob-item">
                <div class="prob-label">Xác suất vỡ nợ:</div>
                <div class="prob-value" style="color: ${riskAssessment.color}">
                    ${probability.toFixed(2)}%
                </div>
            </div>
            <div class="prob-item">
                <div class="prob-label">Xác suất không vỡ nợ:</div>
                <div class="prob-value" style="color: #5cb85c">
                    ${(100 - probability).toFixed(2)}%
                </div>
            </div>
        </div>
        <div class="risk-assessment">
            <div class="risk-level" style="background: ${riskAssessment.color}">
                ${riskAssessment.level}
            </div>
            <div class="assessment-details">
                <h3>Đánh giá:</h3>
                <p>${riskAssessment.assessment}</p>
                <h3>Lời khuyên:</h3>
                <ul>
                    ${riskAssessment.recommendations.map(rec => `<li>${rec}</li>`).join('')}
                </ul>
                <h3>Đề xuất sản phẩm tài chính:</h3>
                <ul class="products-list">
                    ${riskAssessment.products.map(prod => `<li>${prod}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;
});

function getRiskAssessment(probability) {
    if (probability <= 20) {
        return {
            level: 'Rất thấp',
            color: '#28a745',
            assessment: 'Khách hàng có hồ sơ tài chính tốt, nguy cơ vỡ nợ rất thấp.',
            recommendations: [
                'Có thể phê duyệt tín dụng nhanh',
                'Theo dõi định kỳ, không cần kiểm soát gắt'
            ],
            products: [
                'Cho vay tín chấp',
                'Thẻ tín dụng',
                'Hạn mức tín dụng linh hoạt'
            ]
        };
    } else if (probability <= 40) {
        return {
            level: 'Thấp – Trung bình',
            color: '#ffc107',
            assessment: 'Khách hàng có dấu hiệu tiềm ẩn rủi ro nhẹ, vẫn trong mức chấp nhận được.',
            recommendations: [
                'Yêu cầu bổ sung thông tin tài chính',
                'Cho vay nhưng có thể cần tài sản đảm bảo nhỏ',
                'Tăng cường giám sát nhẹ'
            ],
            products: [
                'Cho vay tiêu dùng có bảo đảm',
                'Vay trả góp lãi suất ưu đãi',
                'Tài khoản tiết kiệm liên kết vay'
            ]
        };
    } else if (probability <= 50) {
        return {
            level: 'Trung bình',
            color: '#ffa726',
            assessment: 'Cần đánh giá kỹ lưỡng trước khi cấp tín dụng.',
            recommendations: [
                'Phân tích kỹ hơn lịch sử tín dụng',
                'Hạn chế hạn mức vay hoặc yêu cầu tài sản đảm bảo rõ ràng',
                'Giám sát sau vay định kỳ'
            ],
            products: [
                'Cho vay thế chấp',
                'Bảo lãnh tín dụng',
                'Vay hạn mức thấp'
            ]
        };
    } else if (probability <= 60) {
        return {
            level: 'Trung bình – Cao',
            color: '#fd7e14',
            assessment: 'Nguy cơ vỡ nợ ở mức đáng lưu ý, cần thận trọng.',
            recommendations: [
                'Đánh giá lại toàn diện hồ sơ',
                'Yêu cầu tài sản đảm bảo thanh khoản cao',
                'Có thể yêu cầu bên bảo lãnh',
                'Cân nhắc chia nhỏ khoản vay',
                'Giám sát chặt chẽ quá trình giải ngân và thanh toán'
            ],
            products: [
                'Vay có bảo lãnh',
                'Tái cấu trúc nợ (nếu đang nợ)',
                'Vay ngắn hạn với lãi suất điều chỉnh'
            ]
        };
    } else if (probability <= 70) {
        return {
            level: 'Cao',
            color: '#dc3545',
            assessment: 'Rủi ro vỡ nợ cao, cần hết sức thận trọng.',
            recommendations: [
                'Hạn chế cấp tín dụng',
                'Chỉ xem xét nếu có tài sản đảm bảo rõ ràng',
                'Tăng tần suất giám sát',
                'Áp dụng chính sách lãi suất rủi ro cao'
            ],
            products: [
                'Bảo hiểm tín dụng bắt buộc',
                'Cho vay với tài sản đảm bảo có giá trị cao',
                'Hợp đồng đặt cọc hoặc ký quỹ'
            ]
        };
    } else if (probability <= 80) {
        return {
            level: 'Rất cao',
            color: '#c82333',
            assessment: 'Khả năng vỡ nợ rất cao, khách hàng không ổn định về tài chính.',
            recommendations: [
                'Không khuyến nghị cấp tín dụng thông thường',
                'Chỉ xem xét các gói vay đặc biệt có ràng buộc nghiêm ngặt',
                'Đánh giá lại khả năng trả nợ và dòng tiền'
            ],
            products: [
                'Cho vay ký quỹ 100%',
                'Tài chính vi mô (có giám sát chặt)',
                'Gói vay tái cấu trúc rủi ro cao'
            ]
        };
    } else {
        return {
            level: 'Cực cao',
            color: '#bd2130',
            assessment: 'Rất có thể vỡ nợ, mức độ rủi ro quá cao.',
            recommendations: [
                'Từ chối cấp tín dụng',
                'Đưa vào danh sách rủi ro đặc biệt',
                'Nếu đang vay, cần phương án xử lý khẩn cấp (thu hồi nợ, tái cơ cấu)'
            ],
            products: [
                'Không cấp tín dụng mới',
                'Dịch vụ tư vấn tài chính cá nhân',
                'Đề xuất cải thiện điểm tín dụng (chương trình cải thiện tín nhiệm)'
            ]
        };
    }
}