import SwiftUI
import SwiftData

struct DashboardView: View {
    @Environment(\.modelContext) private var modelContext
    @State private var viewModel = DashboardViewModel()

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: 20) {
                    // Calorie Ring
                    CalorieRingView(
                        consumed: viewModel.caloriesConsumed,
                        target: viewModel.dailyTarget
                    )
                    .frame(width: 220, height: 220)
                    .padding(.top)

                    // Macro Summary
                    macroSummaryCard

                    // Stats Row
                    statsRow

                    // Recent Entries
                    recentEntriesSection
                }
                .padding(.horizontal)
            }
            .navigationTitle("Dashboard")
            .onAppear { viewModel.loadData(context: modelContext) }
            .refreshable { viewModel.loadData(context: modelContext) }
        }
    }

    private var macroSummaryCard: some View {
        HStack(spacing: 0) {
            macroItem(
                label: "Protein",
                value: String(format: "%.0fg", viewModel.dailySummary.totalProtein),
                color: AppColors.proteinColor
            )
            Spacer()
            macroItem(
                label: "Carbs",
                value: String(format: "%.0fg", viewModel.dailySummary.totalCarbs),
                color: AppColors.carbsColor
            )
            Spacer()
            macroItem(
                label: "Fat",
                value: String(format: "%.0fg", viewModel.dailySummary.totalFat),
                color: AppColors.fatColor
            )
        }
        .cardStyle()
    }

    private func macroItem(label: String, value: String, color: Color) -> some View {
        VStack(spacing: 6) {
            Circle()
                .fill(color)
                .frame(width: 10, height: 10)
            Text(value)
                .font(.headline)
                .fontDesign(.rounded)
            Text(label)
                .font(.caption)
                .foregroundStyle(.secondary)
        }
        .frame(maxWidth: .infinity)
    }

    private var statsRow: some View {
        HStack(spacing: 12) {
            statCard(title: "BMR", value: "\(viewModel.bmr)", unit: "cal")
            statCard(title: "TDEE", value: "\(viewModel.tdee)", unit: "cal")
            statCard(title: "Target", value: "\(viewModel.dailyTarget)", unit: "cal")
        }
    }

    private func statCard(title: String, value: String, unit: String) -> some View {
        VStack(spacing: 4) {
            Text(title)
                .font(.caption)
                .foregroundStyle(.secondary)
            Text(value)
                .font(.title3)
                .fontWeight(.bold)
                .fontDesign(.rounded)
            Text(unit)
                .font(.caption2)
                .foregroundStyle(.secondary)
        }
        .frame(maxWidth: .infinity)
        .cardStyle()
    }

    private var recentEntriesSection: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("Today's Food")
                .font(.headline)

            if viewModel.dailySummary.entries.isEmpty {
                VStack(spacing: 8) {
                    Image(systemName: "fork.knife.circle")
                        .font(.system(size: 40))
                        .foregroundStyle(.secondary)
                    Text("No food logged today")
                        .foregroundStyle(.secondary)
                    Text("Use the Scan Food tab to get started")
                        .font(.caption)
                        .foregroundStyle(.tertiary)
                }
                .frame(maxWidth: .infinity)
                .padding(.vertical, 30)
            } else {
                ForEach(viewModel.dailySummary.entries) { entry in
                    HStack {
                        if let imageData = entry.imageData,
                           let uiImage = UIImage(data: imageData) {
                            Image(uiImage: uiImage)
                                .resizable()
                                .scaledToFill()
                                .frame(width: 44, height: 44)
                                .clipShape(RoundedRectangle(cornerRadius: 8))
                        } else {
                            Image(systemName: "fork.knife")
                                .frame(width: 44, height: 44)
                                .background(Color.gray.opacity(0.1))
                                .clipShape(RoundedRectangle(cornerRadius: 8))
                        }

                        VStack(alignment: .leading, spacing: 2) {
                            Text(entry.name)
                                .font(.subheadline)
                                .fontWeight(.medium)
                            Text(entry.timestamp.timeFormatted)
                                .font(.caption)
                                .foregroundStyle(.secondary)
                        }

                        Spacer()

                        Text("\(entry.calories) cal")
                            .font(.subheadline)
                            .fontWeight(.semibold)
                            .foregroundStyle(AppColors.accent)
                    }
                    .padding(.vertical, 4)
                }
            }
        }
        .cardStyle()
    }
}
