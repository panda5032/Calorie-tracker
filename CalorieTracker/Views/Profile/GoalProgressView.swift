import SwiftUI

struct GoalProgressView: View {
    let currentWeight: Double
    let goalWeight: Double
    let startWeight: Double
    let daysRemaining: Int

    private var totalToLose: Double { startWeight - goalWeight }
    private var lostSoFar: Double { startWeight - currentWeight }
    private var progress: Double {
        guard totalToLose > 0 else { return 0 }
        return min(max(lostSoFar / totalToLose, 0), 1.0)
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 16) {
            Text("Weight Loss Progress")
                .font(.headline)

            // Progress bar
            GeometryReader { geo in
                ZStack(alignment: .leading) {
                    RoundedRectangle(cornerRadius: 8)
                        .fill(Color.gray.opacity(0.15))
                        .frame(height: 24)

                    RoundedRectangle(cornerRadius: 8)
                        .fill(
                            LinearGradient(
                                colors: [AppColors.accent, AppColors.deficit],
                                startPoint: .leading,
                                endPoint: .trailing
                            )
                        )
                        .frame(width: geo.size.width * progress, height: 24)
                        .animation(.easeInOut, value: progress)
                }
            }
            .frame(height: 24)

            // Labels
            HStack {
                VStack(alignment: .leading) {
                    Text(String(format: "%.1f lbs", startWeight))
                        .font(.caption)
                        .foregroundStyle(.secondary)
                    Text("Start")
                        .font(.caption2)
                        .foregroundStyle(.tertiary)
                }

                Spacer()

                VStack {
                    Text(String(format: "%.1f lbs", currentWeight))
                        .font(.caption)
                        .fontWeight(.bold)
                        .foregroundStyle(AppColors.accent)
                    Text("Current")
                        .font(.caption2)
                        .foregroundStyle(.tertiary)
                }

                Spacer()

                VStack(alignment: .trailing) {
                    Text(String(format: "%.1f lbs", goalWeight))
                        .font(.caption)
                        .foregroundStyle(.secondary)
                    Text("Goal")
                        .font(.caption2)
                        .foregroundStyle(.tertiary)
                }
            }

            // Stats
            HStack(spacing: 20) {
                VStack {
                    Text(String(format: "%.1f", lostSoFar))
                        .font(.title3)
                        .fontWeight(.bold)
                        .fontDesign(.rounded)
                    Text("lbs lost")
                        .font(.caption)
                        .foregroundStyle(.secondary)
                }
                .frame(maxWidth: .infinity)

                VStack {
                    Text(String(format: "%.1f", totalToLose - lostSoFar))
                        .font(.title3)
                        .fontWeight(.bold)
                        .fontDesign(.rounded)
                    Text("lbs to go")
                        .font(.caption)
                        .foregroundStyle(.secondary)
                }
                .frame(maxWidth: .infinity)

                VStack {
                    Text("\(daysRemaining)")
                        .font(.title3)
                        .fontWeight(.bold)
                        .fontDesign(.rounded)
                    Text("days left")
                        .font(.caption)
                        .foregroundStyle(.secondary)
                }
                .frame(maxWidth: .infinity)
            }
        }
        .cardStyle()
    }
}
