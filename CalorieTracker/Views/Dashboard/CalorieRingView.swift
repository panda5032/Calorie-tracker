import SwiftUI

struct CalorieRingView: View {
    let consumed: Int
    let target: Int
    let lineWidth: CGFloat = 20

    private var progress: Double {
        guard target > 0 else { return 0 }
        return min(Double(consumed) / Double(target), 1.5)
    }

    private var ringColor: Color {
        if progress > 1.0 { return AppColors.surplus }
        if progress > 0.8 { return .yellow }
        return AppColors.calorieRing
    }

    var body: some View {
        ZStack {
            // Background ring
            Circle()
                .stroke(Color.gray.opacity(0.2), lineWidth: lineWidth)

            // Progress ring
            Circle()
                .trim(from: 0, to: min(progress, 1.0))
                .stroke(
                    ringColor,
                    style: StrokeStyle(lineWidth: lineWidth, lineCap: .round)
                )
                .rotationEffect(.degrees(-90))
                .animation(.easeInOut(duration: 0.8), value: progress)

            // Center text
            VStack(spacing: 4) {
                Text("\(consumed)")
                    .font(.system(size: 36, weight: .bold, design: .rounded))
                    .foregroundStyle(ringColor)

                Text("of \(target) cal")
                    .font(.subheadline)
                    .foregroundStyle(.secondary)

                let remaining = target - consumed
                Text(remaining >= 0 ? "\(remaining) remaining" : "\(-remaining) over")
                    .font(.caption)
                    .foregroundStyle(remaining >= 0 ? AppColors.deficit : AppColors.surplus)
                    .fontWeight(.medium)
            }
        }
        .padding()
    }
}
