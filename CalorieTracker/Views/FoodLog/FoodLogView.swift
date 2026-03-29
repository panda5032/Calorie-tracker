import SwiftUI
import SwiftData

struct FoodLogView: View {
    @Environment(\.modelContext) private var modelContext
    @State private var viewModel = FoodLogViewModel()
    @State private var showingManualEntry = false

    var body: some View {
        NavigationStack {
            VStack(spacing: 0) {
                // Date Picker
                DatePicker(
                    "Select Date",
                    selection: $viewModel.selectedDate,
                    displayedComponents: .date
                )
                .datePickerStyle(.compact)
                .padding()
                .onChange(of: viewModel.selectedDate) { _, _ in
                    viewModel.loadEntries(context: modelContext)
                }

                // Daily total
                HStack {
                    Text("Total")
                        .font(.subheadline)
                        .foregroundStyle(.secondary)
                    Spacer()
                    Text(viewModel.totalCalories.calorieFormatted)
                        .font(.headline)
                        .fontDesign(.rounded)
                        .foregroundStyle(AppColors.accent)
                }
                .padding(.horizontal)
                .padding(.bottom, 8)

                Divider()

                // Entries list
                if viewModel.entries.isEmpty {
                    ContentUnavailableView(
                        "No Food Logged",
                        systemImage: "tray",
                        description: Text("Tap + to add a food entry")
                    )
                } else {
                    List {
                        ForEach(viewModel.entries) { entry in
                            FoodEntryRow(entry: entry)
                        }
                        .onDelete { indexSet in
                            for index in indexSet {
                                viewModel.deleteEntry(viewModel.entries[index], context: modelContext)
                            }
                        }
                    }
                    .listStyle(.plain)
                }
            }
            .navigationTitle("Food Log")
            .toolbar {
                ToolbarItem(placement: .primaryAction) {
                    Button {
                        showingManualEntry = true
                    } label: {
                        Image(systemName: "plus.circle.fill")
                            .font(.title3)
                    }
                }
            }
            .sheet(isPresented: $showingManualEntry) {
                ManualEntryView {
                    viewModel.loadEntries(context: modelContext)
                }
            }
            .onAppear { viewModel.loadEntries(context: modelContext) }
        }
    }
}
